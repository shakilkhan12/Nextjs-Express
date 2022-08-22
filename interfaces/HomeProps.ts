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
      },
      votes: {
        _id: string;
        createdAt: string;
        updatedAt: string;
        postsId: string;
        username: string;
        value: number;
      }[],
      createdAt: string;
      updatedAt: string;
    }[],
    token: string;
    }