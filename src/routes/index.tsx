import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { client } from '../lib/contentful';
import type { PostSkeleton } from '../types/Post';

export const Route = createFileRoute('/')({
   component: function Home() {
      const posts = useQuery({
         queryKey: ['posts'],
         queryFn: async () => {
            return await client.getEntries<PostSkeleton>({ content_type: 'post' });
         },
      });

      if (posts.isLoading) return <div>Loading...</div>;
      if (posts.error) return <div>Error: {posts.error.message}</div>;
      if (!posts.data) return <div>No data</div>;

      return (
         <>
            {posts.data.items.map((post) => (
               <div key={post.sys.id}>
                  <h1 className='text-3xl font-bold'>{post.fields.title}</h1>
                  <p className='text-zinc-500 text-lg'>{post.fields.description}</p>

                  <Link
                     to='/posts/$id'
                     params={{
                        id: post.sys.id,
                     }}
                  >
                     Read more
                  </Link>
               </div>
            ))}
         </>
      );
   },
});
