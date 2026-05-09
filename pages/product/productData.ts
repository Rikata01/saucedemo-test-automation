export type ProductName = 'backpack' | 'bikeLight' | 'boltTShirt' | 'fleeceJacket' | 'onesie' | 'redTShirt'

export const ProductIDs: Record<ProductName, string> = {
    backpack: 'sauce-labs-backpack',
    bikeLight: 'sauce-labs-bike-light',
    boltTShirt: 'sauce-labs-bolt-t-shirt',
    fleeceJacket: 'sauce-labs-fleece-jacket',
    onesie: 'sauce-labs-onesie',
    redTShirt: 'test.allthethings()-t-shirt-(red)'
};

export const ProductDetailLocators: Record<ProductName, string> = {
    backpack: '[data-test="item-4-title-link"]',
    bikeLight: '[data-test="item-0-title-link"]',
    boltTShirt: '[data-test="item-1-title-link"]',
    fleeceJacket: '[data-test="item-5-title-link"]',
    onesie: '[data-test="item-2-title-link"]',
    redTShirt: '[data-test="item-3-title-link"]'
};