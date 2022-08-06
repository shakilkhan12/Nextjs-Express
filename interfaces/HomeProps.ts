export interface HomeProps {
    posts: {
      comments: string[],
      _id: string;
      identifier: string;
      title: string;
      slug: string;
      body: string;
      sub: {
        name: string;
      };
      user: {
        username: string;
      }
      createdAt: string;
      updatedAt: string;
    }[]
    }