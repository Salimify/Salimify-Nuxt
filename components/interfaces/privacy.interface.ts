export interface PrivacyPolicyAttributes {
    title: string
    content: string
    locale: string
    updatedAt: string
}

export interface PrivacyPolicy {
    id: number
    attributes: PrivacyPolicyAttributes
}
