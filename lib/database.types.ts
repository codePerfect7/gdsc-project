export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          author: string
          blog_image: string | null
          content: string
          created_at: string
          disliked_by: string[]
          dislikes: number
          id: string
          liked_by: string[]
          likes: number
          title: string
        }
        Insert: {
          author?: string
          blog_image?: string | null
          content: string
          created_at?: string
          disliked_by?: string[]
          dislikes?: number
          id?: string
          liked_by?: string[]
          likes?: number
          title: string
        }
        Update: {
          author?: string
          blog_image?: string | null
          content?: string
          created_at?: string
          disliked_by?: string[]
          dislikes?: number
          id?: string
          liked_by?: string[]
          likes?: number
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string
          email: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string
          email?: string
          id?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string
          email?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      dislike_post: {
        Args: {
          postid: string
          userid: string
        }
        Returns: undefined
      }
      like_post: {
        Args: {
          postid: string
          userid: string
        }
        Returns: undefined
      }
      remove_dislike: {
        Args: {
          postid: string
          userid: string
        }
        Returns: undefined
      }
      remove_like: {
        Args: {
          postid: string
          userid: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
