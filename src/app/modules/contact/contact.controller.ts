import { Contact } from "./contact.model";
import { createContactValidation, updateContactValidation } from "./contact.validation";
import { asyncHandler } from "../../utils/asyncHandler";
import { getApiErrorClass } from "../../interface/apiError";
import { getApiResponseClass } from "../../interface/apiResponse";
import status from "http-status";

const ApiError = getApiErrorClass("CONTACT");
const ApiResponse = getApiResponseClass("CONTACT");

export const createContact = asyncHandler(async (req, res) => {
    const validatedData = createContactValidation.parse(req.body);

    const contact = new Contact(validatedData);
    await contact.save();

    res.status(status.CREATED).json(
        new ApiResponse(status.CREATED, "Contact message sent successfully", contact)
    );
});

export const getAllContacts = asyncHandler(async (req, res) => {
    const { isRead, page = 1, limit = 20 } = req.query;

    const filter: any = { isDeleted: false };
    if (isRead !== undefined) filter.isRead = isRead === "true";

    const skip = (Number(page) - 1) * Number(limit);

    const [contacts, total] = await Promise.all([
        Contact.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        Contact.countDocuments(filter),
    ]);

    res.json(
        new ApiResponse(status.OK, "Contacts retrieved successfully", {
            contacts,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / Number(limit)),
            },
        })
    );
});

export const getContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await Contact.findOne({ _id: id, isDeleted: false });

    if (!contact) {
        throw new ApiError(status.NOT_FOUND, "Contact not found");
    }

    res.json(new ApiResponse(status.OK, "Contact retrieved successfully", contact));
});

export const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validatedData = updateContactValidation.parse(req.body);

    const contact = await Contact.findOneAndUpdate(
        { _id: id, isDeleted: false },
        validatedData,
        { new: true, runValidators: true }
    );

    if (!contact) {
        throw new ApiError(status.NOT_FOUND, "Contact not found");
    }

    res.json(new ApiResponse(status.OK, "Contact updated successfully", contact));
});

export const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await Contact.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );

    if (!contact) {
        throw new ApiError(status.NOT_FOUND, "Contact not found");
    }

    res.json(new ApiResponse(status.OK, "Contact deleted successfully"));
});

export const markAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await Contact.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isRead: true },
        { new: true }
    );

    if (!contact) {
        throw new ApiError(status.NOT_FOUND, "Contact not found");
    }

    res.json(new ApiResponse(status.OK, "Contact marked as read", contact));
});

export const getContactStats = asyncHandler(async (_req, res) => {
    const [total, unread] = await Promise.all([
        Contact.countDocuments({ isDeleted: false }),
        Contact.countDocuments({ isDeleted: false, isRead: false }),
    ]);

    res.json(
        new ApiResponse(status.OK, "Contact stats retrieved successfully", {
            total,
            unread,
            read: total - unread,
        })
    );
});
