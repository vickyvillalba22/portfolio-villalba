export type UserRole = 'admin' | 'user'

export class User {
  constructor(
    public id: number,
    public name: string,
    public usuario: string,
    public email: string,
    public password: string,
    public role: UserRole,
    public isSubscribed: boolean,
    public registerDate: string,
    public likedPosts: number[],
    public avatar?: string
  ) {}

  isAdmin() {
    return this.role === 'admin'
  }

  get likedCount() {
    return this.likedPosts.length
  }

  likePost(postId: number) {
    if (!this.likedPosts.includes(postId)) {
      this.likedPosts.push(postId)
    }
  }
  unlikePost(postId: number) {
    this.likedPosts = this.likedPosts.filter(id => id !== postId)
  }

    toggleSubscription() {
    this.isSubscribed = !this.isSubscribed
  }
}
