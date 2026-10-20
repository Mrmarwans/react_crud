<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Contact::query()->orderBy('created_at', 'desc');

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $contacts = $query->get();

        return response()->json([
            'message' => 'Contacts retrieved successfully',
            'data' => $contacts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validated);

        if ($contact) {
            return response()->json([
                'message' => 'Contact message sent successfully',
                'data' => $contact
            ], 201);
        } else {
            return response()->json([
                'message' => 'Failed to send contact message'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return response()->json([
            'message' => 'Contact retrieved successfully',
            'data' => $contact
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:unread,read,replied',
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'sometimes|string|max:255',
            'message' => 'sometimes|string',
        ]);

        $update = $contact->update($validated);

        if ($update) {
            return response()->json([
                'message' => 'Contact updated successfully',
                'data' => $contact->fresh()
            ]);
        } else {
            return response()->json([
                'message' => 'Contact update failed'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $delete = Contact::destroy($contact->id);

        if ($delete) {
            return response()->json([
                'message' => 'Contact deleted successfully'
            ]);
        } else {
            return response()->json([
                'message' => 'Contact deletion failed'
            ], 500);
        }
    }

    /**
     * Mark contact as read.
     */
    public function markAsRead(Contact $contact)
    {
        $contact->markAsRead();

        return response()->json([
            'message' => 'Contact marked as read',
            'data' => $contact->fresh()
        ]);
    }

    /**
     * Mark contact as replied.
     */
    public function markAsReplied(Contact $contact)
    {
        $contact->markAsReplied();

        return response()->json([
            'message' => 'Contact marked as replied',
            'data' => $contact->fresh()
        ]);
    }

    /**
     * Get unread contacts count.
     */
    public function unreadCount()
    {
        $count = Contact::unread()->count();

        return response()->json([
            'message' => 'Unread count retrieved successfully',
            'count' => $count
        ]);
    }
}
