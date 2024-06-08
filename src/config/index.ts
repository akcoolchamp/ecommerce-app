type CONFIG = {
    PRODUCT_TABLE: string;
    PRODUCT_TAXONOMY_TABLE: string;
};

export const config: CONFIG = {
    PRODUCT_TABLE: process.env.PRODUCT_TABLE,
    PRODUCT_TAXONOMY_TABLE: process.env.PRODUCT_TAXONOMY_TABLE,
};
