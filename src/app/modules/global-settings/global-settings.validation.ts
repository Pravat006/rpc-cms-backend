import z from "zod";

const navigationItemSchema: z.ZodType<any> = z.lazy(() =>
    z.object({
        label: z.string().min(1),
        url: z.string().min(1),
        order: z.number().int().min(0),
        isExternal: z.boolean().default(false),
        children: z.array(navigationItemSchema).optional(),
    })
);

export const updateGlobalSettingsValidation = z.object({
    siteName: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    logo: z.string().url().optional(),
    logoAlt: z.string().min(1).optional(),

    contact: z.object({
        phones: z.array(z.string()).optional(),
        emails: z.array(z.string().email()).optional(),
        address: z.object({
            title: z.string().optional(),
            lines: z.array(z.string()).optional(),
        }).optional(),
    }).optional(),

    socialLinks: z.object({
        facebook: z.string().url().optional().or(z.literal("")),
        twitter: z.string().url().optional().or(z.literal("")),
        instagram: z.string().url().optional().or(z.literal("")),
        linkedin: z.string().url().optional().or(z.literal("")),
    }).optional(),

    ctaButtonLabel: z.string().min(1).optional(),
    ctaButtonUrl: z.string().optional(),

    menus: z.object({
        header: z.array(navigationItemSchema).optional(),
        footerQuickLinks: z.array(navigationItemSchema).optional(),
        footerSecondary: z.array(navigationItemSchema).optional(),
    }).optional(),
});
