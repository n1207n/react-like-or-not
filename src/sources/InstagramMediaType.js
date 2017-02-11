// @flow

export type InstagramMediaType = {
  videos?: {
    low_bandwidth: {
      width: number,
      height: number,
      url: string,
    },
    standard_resolution: {
      width: number,
      height: number,
      url: string,
    },
    low_resolution: {
      width: number,
      height: number,
      url: string,
    }
  },
  users_in_photo: Array<number>,
  link: string,
  tags: Array<string>,
  user_has_liked: boolean,
  caption: {
    created_time: string,
    text: string,
    id: string,
    from: {
      username: string,
      full_name: string,
      profile_picture: string,
      id: string
    }
  },
  type: string,
  id: string,
  created_time: string,
  user: {
    username: string,
    full_name: string,
    profile_picture: string,
    id: string
  },
  attribution: null,
  location: {
    latitude: number,
    longitude: number,
    id: number,
    name: string
  },
  filter: string,
  images: {
    low_resolution: {
      width: number,
      height: number,
      url: string
    },
    thumbnail: {
      width: number,
      height: number,
      url: string
    },
    standard_resolution: {
      width: number,
      height: number,
      url: string
    }
  },
  comments: {
    count: number
  },
  likes: {
    count: number
  }
}
