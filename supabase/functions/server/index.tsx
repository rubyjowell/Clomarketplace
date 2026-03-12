import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import Stripe from "npm:stripe@17.4.0";

const app = new Hono();

// Initialize Stripe
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-11-20.acacia',
});

// Middleware
app.use("*", cors());
app.use("*", logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Health check endpoint
app.get("/make-server-9f30820f/health", (c) => {
  return c.json({ status: "ok" });
});

// Clear all data (DEVELOPMENT ONLY - Remove in production)
app.delete("/make-server-9f30820f/dev/clear-all-items", async (c) => {
  try {
    // Get all items and delete them
    const items = await kv.getByPrefix('item:');
    for (const item of items) {
      await kv.del(`item:${item.id}`);
    }
    
    return c.json({ success: true, message: `Deleted ${items.length} items` });
  } catch (error) {
    console.error('Clear items error:', error);
    return c.json({ error: 'Failed to clear items' }, 500);
  }
});

// ============= AUTH ENDPOINTS =============

// Sign up endpoint
app.post("/make-server-9f30820f/auth/signup", async (c) => {
  try {
    const { email, password, fullName, college } = await c.req.json();

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        full_name: fullName,
        college: college 
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Create user profile in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}`, {
      id: userId,
      email,
      fullName,
      college,
      tagsAvailable: 4, // Start with 4 tags
      tagsUsed: 0,
      membershipStartDate: new Date().toISOString(),
      instagramHandle: '',
      bio: '',
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true, 
      user: data.user,
      message: 'Account created successfully' 
    });

  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Failed to create account' }, 500);
  }
});

// Sign in endpoint
app.post("/make-server-9f30820f/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return c.json({ error: error.message }, 401);
    }

    return c.json({ 
      success: true,
      session: data.session,
      user: data.user
    });

  } catch (error) {
    console.error('Sign in error:', error);
    return c.json({ error: 'Failed to sign in' }, 500);
  }
});

// Get current user profile
app.get("/make-server-9f30820f/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user profile from KV store
    const profile = await kv.get(`user:${user.id}`);

    return c.json({ 
      success: true,
      profile: profile || {
        id: user.id,
        email: user.email,
        ...user.user_metadata
      }
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Update user profile
app.put("/make-server-9f30820f/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const currentProfile = await kv.get(`user:${user.id}`) || {};
    
    const updatedProfile = {
      ...currentProfile,
      ...updates,
      id: user.id // Don't allow ID changes
    };

    await kv.set(`user:${user.id}`, updatedProfile);

    return c.json({ 
      success: true,
      profile: updatedProfile
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// ============= MARKETPLACE ENDPOINTS =============

// Get all marketplace items
app.get("/make-server-9f30820f/items", async (c) => {
  try {
    const items = await kv.getByPrefix('item:');
    return c.json({ success: true, items });
  } catch (error) {
    console.error('Items fetch error:', error);
    return c.json({ error: 'Failed to fetch items' }, 500);
  }
});

// Get single item
app.get("/make-server-9f30820f/items/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const item = await kv.get(`item:${id}`);
    
    if (!item) {
      return c.json({ error: 'Item not found' }, 404);
    }

    return c.json({ success: true, item });
  } catch (error) {
    console.error('Item fetch error:', error);
    return c.json({ error: 'Failed to fetch item' }, 500);
  }
});

// Create new item (requires auth)
app.post("/make-server-9f30820f/items", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const itemData = await c.req.json();
    const itemId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const item = {
      id: itemId,
      ...itemData,
      ownerId: user.id,
      createdAt: new Date().toISOString(),
      isAvailable: true
    };

    await kv.set(`item:${itemId}`, item);

    return c.json({ success: true, item });
  } catch (error) {
    console.error('Item creation error:', error);
    return c.json({ error: 'Failed to create item' }, 500);
  }
});

// ============= FAVOURITES ENDPOINTS =============

// Get user's favourites
app.get("/make-server-9f30820f/favourites", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const favourites = await kv.get(`favourites:${user.id}`) || [];

    return c.json({ success: true, favourites });
  } catch (error) {
    console.error('Favourites fetch error:', error);
    return c.json({ error: 'Failed to fetch favourites' }, 500);
  }
});

// Add to favourites
app.post("/make-server-9f30820f/favourites/:itemId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const itemId = c.req.param('itemId');
    const favourites = await kv.get(`favourites:${user.id}`) || [];
    
    if (!favourites.includes(itemId)) {
      favourites.push(itemId);
      await kv.set(`favourites:${user.id}`, favourites);
    }

    return c.json({ success: true, favourites });
  } catch (error) {
    console.error('Add favourite error:', error);
    return c.json({ error: 'Failed to add favourite' }, 500);
  }
});

// Remove from favourites
app.delete("/make-server-9f30820f/favourites/:itemId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const itemId = c.req.param('itemId');
    let favourites = await kv.get(`favourites:${user.id}`) || [];
    
    favourites = favourites.filter((id: string) => id !== itemId);
    await kv.set(`favourites:${user.id}`, favourites);

    return c.json({ success: true, favourites });
  } catch (error) {
    console.error('Remove favourite error:', error);
    return c.json({ error: 'Failed to remove favourite' }, 500);
  }
});

// ============= TAGS/CREDITS ENDPOINTS =============

// Create Stripe checkout session for tag purchase
app.post("/make-server-9f30820f/stripe/create-checkout-session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { packageId, quantity, price, returnUrl } = await c.req.json();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${quantity} Tags`,
              description: `Purchase ${quantity} rental tags for CLO Marketplace`,
            },
            unit_amount: price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${returnUrl}?canceled=true`,
      metadata: {
        userId: user.id,
        packageId,
        quantity: quantity.toString(),
      },
    });

    return c.json({ 
      success: true,
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return c.json({ error: 'Failed to create checkout session' }, 500);
  }
});

// Verify payment and add tags
app.post("/make-server-9f30820f/stripe/verify-payment", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { sessionId } = await c.req.json();

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return c.json({ error: 'Payment not completed' }, 400);
    }

    if (session.metadata?.userId !== user.id) {
      return c.json({ error: 'Invalid session' }, 400);
    }

    const quantity = parseInt(session.metadata?.quantity || '0');
    
    // Add tags to user's account
    const profile = await kv.get(`user:${user.id}`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    profile.tagsAvailable = (profile.tagsAvailable || 0) + quantity;
    await kv.set(`user:${user.id}`, profile);

    // Save payment record
    const paymentId = `payment-${Date.now()}`;
    await kv.set(paymentId, {
      id: paymentId,
      userId: user.id,
      sessionId,
      quantity,
      amount: session.amount_total / 100,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true,
      tagsAvailable: profile.tagsAvailable,
      quantity
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return c.json({ error: 'Failed to verify payment' }, 500);
  }
});

// Purchase additional tags (direct - for testing, use Stripe in production)
app.post("/make-server-9f30820f/tags/purchase", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { quantity } = await c.req.json();
    const profile = await kv.get(`user:${user.id}`);

    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    // Add tags to user's account
    profile.tagsAvailable = (profile.tagsAvailable || 0) + quantity;
    await kv.set(`user:${user.id}`, profile);

    return c.json({ 
      success: true,
      tagsAvailable: profile.tagsAvailable,
      message: `${quantity} tag${quantity > 1 ? 's' : ''} added to your account`
    });

  } catch (error) {
    console.error('Tag purchase error:', error);
    return c.json({ error: 'Failed to purchase tags' }, 500);
  }
});

// Create checkout session (use tag to rent item)
app.post("/make-server-9f30820f/checkout", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { itemId, startDate, endDate } = await c.req.json();
    const profile = await kv.get(`user:${user.id}`);
    const item = await kv.get(`item:${itemId}`);

    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    if (!item) {
      return c.json({ error: 'Item not found' }, 404);
    }

    if (profile.tagsAvailable < item.tags) {
      return c.json({ error: 'Not enough tags available' }, 400);
    }

    // Deduct tags
    profile.tagsAvailable -= item.tags;
    profile.tagsUsed = (profile.tagsUsed || 0) + item.tags;
    await kv.set(`user:${user.id}`, profile);

    // Create rental record
    const rentalId = `rental-${Date.now()}`;
    await kv.set(rentalId, {
      id: rentalId,
      itemId,
      userId: user.id,
      startDate,
      endDate,
      tagsUsed: item.tags,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true,
      rental: { id: rentalId, itemId, startDate, endDate },
      tagsRemaining: profile.tagsAvailable
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return c.json({ error: 'Failed to complete checkout' }, 500);
  }
});

Deno.serve(app.fetch);