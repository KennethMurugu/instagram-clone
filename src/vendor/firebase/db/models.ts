export interface UserAccount {
  email?: string
  full_name?: string
  phone?: string
  uid?: string
  user_name?: string
  bio?: string
  profile_photo?: string
}

export interface Post {
  caption?: string
  created_at?: number
  owner?: UserAccount
  post_image?: string
}
