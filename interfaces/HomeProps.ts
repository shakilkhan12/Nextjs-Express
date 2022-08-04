export interface HomeProps {
    posts: {
      comments: string[],
      _id: string;
      identifier: string;
      title: string;
      slug: string;
      body: string;
      subName: string;
      user: string;
      userDetails: {
        username: string;
      },
      createdAt: string;
      updatedAt: string;
    }[]
    }