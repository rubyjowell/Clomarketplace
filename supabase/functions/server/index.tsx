import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-9f30820f/health", (c) => {
  return c.json({ status: "ok" });
});

// Seed initial data (for demo purposes)
app.post("/make-server-9f30820f/seed", async (c) => {
  try {
    const sampleItems = [
      {
        id: "item-1",
        name: "Silk Evening Gown",
        brand: "Reformation",
        size: "S",
        tags: 2,
        category: "dress",
        ownerId: "demo-user",
        ownerName: "Sarah Mitchell",
        isAvailable: true,
        imageUrl: "",
        createdAt: new Date().toISOString(),
      },
      {
        id: "item-2",
        name: "Leather Jacket",
        brand: "AllSaints",
        size: "M",
        tags: 3,
        category: "jacket",
        ownerId: "demo-user",
        ownerName: "Sarah Mitchell",
        isAvailable: true,
        imageUrl: "",
        createdAt: new Date().toISOString(),
      },
      {
        id: "item-3",
        name: "Designer Handbag",
        brand: "Coach",
        size: "One Size",
        tags: 2,
        category: "bag",
        ownerId: "demo-user",
        ownerName: "Emma Chen",
        isAvailable: true,
        imageUrl: "",
        createdAt: new Date().toISOString(),
      },
      {
        id: "item-4",
        name: "Cocktail Dress",
        brand: "ASTR The Label",
        size: "M",
        tags: 1,
        category: "dress",
        ownerId: "demo-user",
        ownerName: "Emma Chen",
        isAvailable: true,
        imageUrl: "",
        createdAt: new Date().toISOString(),
      },
      {
        id: "item-5",
        name: "Blazer",
        brand: "Theory",
        size: "L",
        tags: 2,
        category: "top",
        ownerId: "demo-user",
        ownerName: "Alex Johnson",
        isAvailable: true,
        imageUrl: "",
        createdAt: new Date().toISOString(),
      },
      {
        id: "item-6",
        name: "Statement Earrings",
        brand: "BaubleBar",
        size: "One Size",
        tags: 1,
        category: "accessories",
        ownerId: "demo-user",
        ownerName: "Alex Johnson",
        isAvailable: true,
        imageUrl: "",
        createdAt: new Date().toISOString(),
      },
    ];

    // Save each item to the database
    for (const item of sampleItems) {
      await kv.set(`item:${item.id}`, item);
    }

    return c.json({ 
      success: true, 
      message: `Seeded ${sampleItems.length} items` 
    });
  } catch (error) {
    console.error('Seed error:', error);
    return c.json({ error: 'Failed to seed data' }, 500);
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

// Purchase additional tags
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