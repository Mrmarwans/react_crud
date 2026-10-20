# Quick Start Guide - Contact MVC Setup

## ✨ What Was Created

### 1. Migration File
**File:** `database/migrations/2026_10_21_120000_create_contacts_table.php`
- Creates `contacts` table with all necessary fields
- Includes status tracking (unread/read/replied)

### 2. Model
**File:** `app/Models/Contact.php`
- Eloquent model with fillable attributes
- Query scopes for filtering (unread, read)
- Helper methods (markAsRead, markAsReplied)

### 3. Controller
**File:** `app/Http/Controllers/ContactController.php`
- Full CRUD operations
- Status management endpoints
- Unread count functionality

### 4. Routes
**File:** `routes/api.php` (Updated)
- RESTful API routes for contacts
- Custom routes for status updates
- Unread count endpoint

---

## 🚀 Quick Setup Commands

### Step 1: Copy Environment File (if not exists)
```bash
cd c:\Users\Future_Mind\Documents\GitHub\react_crud\student-management
copy .env.example .env
```

### Step 2: Install Dependencies (if needed)
```bash
composer install
```

### Step 3: Generate Application Key
```bash
E```

### Step 4: Configure Database
Edit `.env` file and set your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=student_management
DB_USERNAME=root
DB_PASSWORD=
```

### Step 5: Run Migrations
```bash
php artisan migrate
```

### Step 6: Start Server
```bash
php artisan serve
```

Your API will be available at: `http://localhost:8000`

---

## 🧪 Test the API

### Test 1: Create a Contact
```bash
curl -X POST http://localhost:8000/api/contacts -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"subject\":\"Test\",\"message\":\"Hello World\"}"
```

### Test 2: Get All Contacts
```bash
curl http://localhost:8000/api/contacts
```

### Test 3: Get Unread Count
```bash
curl http://localhost:8000/api/contacts-unread-count
```

---

## 🔗 API Endpoints Summary

```
Base URL: http://localhost:8000/api

GET    /contacts                        - Get all contacts
POST   /contacts                        - Create contact
GET    /contacts/{id}                   - Get single contact
PUT    /contacts/{id}                   - Update contact
DELETE /contacts/{id}                   - Delete contact
POST   /contacts/{id}/mark-as-read      - Mark as read
POST   /contacts/{id}/mark-as-replied   - Mark as replied
GET    /contacts-unread-count           - Get unread count
```

---

## 🎯 Integration with React

Update your `Contact.jsx` file's `handleSubmit` function:

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    
    setIsLoading(true);
    
    try {
        const response = await fetch('http://localhost:8000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('✓ ' + data.message);
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setErrors({});
        } else {
            throw new Error(data.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Failed to send message. Please try again.');
    } finally {
        setIsLoading(false);
    }
};
```

---

## 📋 Database Table Structure

```
Table: contacts
+------------+------------------+
| Column     | Type             |
+------------+------------------+
| id         | BIGINT (PK)      |
| name       | VARCHAR(255)     |
| email      | VARCHAR(255)     |
| phone      | VARCHAR(20) NULL |
| subject    | VARCHAR(255)     |
| message    | TEXT             |
| status     | ENUM             |
| created_at | TIMESTAMP        |
| updated_at | TIMESTAMP        |
+------------+------------------+

Status values: 'unread', 'read', 'replied'
```

---

## 🛠️ Troubleshooting

### CORS Error
If you get CORS errors from React, add this to your Laravel project:

1. Install package:
```bash
composer require fruitcake/laravel-cors
```

2. Update `config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5173'],
```

### Database Connection Error
- Check your `.env` database credentials
- Make sure MySQL/MariaDB is running
- Create the database if it doesn't exist:
```sql
CREATE DATABASE student_management;
```

### Migration Error
If migration fails, rollback and retry:
```bash
php artisan migrate:rollback
php artisan migrate
```

---

## ✅ Verification Checklist

- [ ] `.env` file created and configured
- [ ] Database credentials correct
- [ ] Migrations run successfully (`contacts` table created)
- [ ] Laravel server running (`php artisan serve`)
- [ ] Can create contact via curl/Postman
- [ ] Can retrieve contacts via API
- [ ] React form connected to API
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Form resets after submission

---

## 📚 Additional Resources

- **Full API Documentation:** See `CONTACT_API_DOCUMENTATION.md`
- **Setup Guide:** See `CONTACT_SETUP_GUIDE.md`
- **Laravel Docs:** https://laravel.com/docs

---

## 🎉 Success!

If all steps are completed, you now have:
✅ Contact form backend with full CRUD
✅ Status tracking system (unread/read/replied)
✅ RESTful API endpoints
✅ React frontend connected to backend
✅ Form validation on both sides
✅ Loading states and error handling

Your contact system is ready to use! 🚀
