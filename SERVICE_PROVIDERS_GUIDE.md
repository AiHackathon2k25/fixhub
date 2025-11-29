# 👷 Service Providers System

## 🎉 What's Been Added

FixHub now automatically **routes tickets to the correct service provider** based on damage category!

---

## 🏢 Service Providers

### **4 Default Providers Created:**

1. **🔧 Plumbing Services**
   - **Name:** Hans Andersen
   - **Company:** FixHub Plumbing Services
   - **Email:** hans@fixhub-plumbing.dk
   - **Phone:** +45 12 34 56 78
   - **Handles:** Plumbing, water leaks, pipes, heating

2. **⚡ Electronics Repair**
   - **Name:** Maria Nielsen
   - **Company:** FixHub Electronics Repair
   - **Email:** maria@fixhub-electronics.dk
   - **Phone:** +45 23 45 67 89
   - **Handles:** Smartphones, laptops, tablets, TVs, audio

3. **🏠 Appliance Repair**
   - **Name:** Lars Hansen
   - **Company:** FixHub Appliance Repair
   - **Email:** lars@fixhub-appliances.dk
   - **Phone:** +45 34 56 78 90
   - **Handles:** Washing machines, dishwashers, refrigerators, ovens

4. **🔨 General Repairs**
   - **Name:** Sofia Johansen
   - **Company:** FixHub General Repairs
   - **Email:** sofia@fixhub-general.dk
   - **Phone:** +45 45 67 89 01
   - **Handles:** Furniture, woodwork, general repairs, other

---

## 🔄 Automatic Routing

### **How It Works:**

```
User Analysis → Category Detected → Provider Assigned → Ticket Created
```

**Example Flow:**
1. User reports: "My washing machine is leaking"
2. AI analyzes → Category: "appliance"
3. System routes → **Lars Hansen** (Appliance Repair)
4. Ticket created → Assigned to Lars
5. History shows → Provider name + ticket number

---

## 📊 Category Mapping

| Analysis Category | → | Service Provider |
|------------------|---|------------------|
| **plumbing** | → | Hans Andersen (Plumbing) |
| **electronics** | → | Maria Nielsen (Electronics) |
| **appliance** | → | Lars Hansen (Appliances) |
| **furniture** | → | Sofia Johansen (General) |
| **other** | → | Sofia Johansen (General) |

---

## 🎫 What You'll See in History

### **History Card (Collapsed):**
```
┌────────────────────────────────────┐
│ [moderate] [appliance]            │
│ [🎫 Ticket #1234567890]            │ ← Ticket Number
│ [👷 Lars Hansen]                   │ ← Provider Name
│ Washing machine leaking...         │
│ Nov 29, 17:45 • 3 files           │
│              [View] [Delete]      │
└────────────────────────────────────┘
```

### **History Card (Expanded):**
```
┌────────────────────────────────────┐
│ ... analysis details ...          │
│                                    │
│ 🎫 Support Ticket Created          │
│ Ticket ID: ticket_1234567890_abc   │
│                                    │
│ 👷 Assigned Service Provider       │
│ Lars Hansen                        │
│ lars@fixhub-appliances.dk          │
└────────────────────────────────────┘
```

---

## 🧪 Test It

### **Test 1: Plumbing Issue**
1. Analyze: "Water leak under kitchen sink"
2. Category: **plumbing**
3. Ticket → **Hans Andersen** (Plumbing)
4. Check history → See provider assigned

### **Test 2: Electronics Issue**
1. Analyze: "Laptop screen cracked"
2. Category: **electronics**
3. Ticket → **Maria Nielsen** (Electronics)
4. Check history → See provider assigned

### **Test 3: Appliance Issue**
1. Analyze: "Dishwasher not draining"
2. Category: **appliance**
3. Ticket → **Lars Hansen** (Appliances)
4. Check history → See provider assigned

---

## 📁 Files Created:

✅ `backend/src/models/ServiceProvider.ts` - Provider model  
✅ `backend/src/services/serviceProviderService.ts` - Provider logic  
✅ `SERVICE_PROVIDERS_GUIDE.md` - This guide  

## 📝 Files Modified:

✅ `backend/src/models/Ticket.ts` - Added provider fields  
✅ `backend/src/models/AnalysisHistory.ts` - Added provider info  
✅ `backend/src/routes/tickets.ts` - Auto-assigns provider  
✅ `frontend/app/components/AnalysisHistory.tsx` - Shows provider  

---

## 🔍 Backend Logs

When you create a ticket, you'll see:

```
🔍 [ServiceProvider] Looking for provider for category: appliance → appliance
✅ [ServiceProvider] Found provider: Lars Hansen (FixHub Appliance Repair)
👷 [Tickets] Assigning to provider: Lars Hansen (FixHub Appliance Repair)
📦 [MockDB] Ticket created: ticket_xxx for user: user_xxx
```

---

## 📊 Provider Data Storage

Providers are stored in:
- **File:** `backend/data/serviceProviders.json`
- **Collection:** `serviceProviders`
- **Auto-created** on first backend start
- **Persists** across restarts

---

## 🎯 Features:

✅ **Automatic routing** - Based on category  
✅ **4 service providers** - Pre-configured  
✅ **Ticket assignment** - Auto-assigned on creation  
✅ **History display** - Shows provider info  
✅ **Ticket number** - Clearly visible  
✅ **Persistent storage** - Saved to JSON files  

---

## 🚀 Ready to Test!

1. **Restart backend** (to create providers)
2. **Login:** test@fixhub.com / test123
3. **Analyze damage** (e.g., "washing machine broken")
4. **Create ticket** - See it auto-assigned!
5. **Check history** - See ticket number + provider! 🎫👷

---

**Your tickets now automatically route to the right service provider!** 🎉

