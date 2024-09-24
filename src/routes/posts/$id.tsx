import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import type { PostSkeleton } from '../../types/Post';
import { client } from '../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


export const Route = createFileRoute('/posts/$id')({
  component: function Post() {

    const id = Route.useParams().id;

    const post = useQuery({
      queryKey: [`post:${id}`],
      queryFn: async () => {
        return client.getEntry<PostSkeleton>(id);
      }
    })

    if (post.isLoading) return <div>Loading...</div>
    if (post.error) return <div>Error: {post.error.message}</div>
    if (!post.data) return <div>No data</div>



    return (
      <>
        <div className='flex gap-4'>
          <a href='/'>Posts</a>
          <span>&gt;</span>
          <Link to="/posts/$id" params={{ id: post.data.sys.id }}>{post.data.fields.title}</Link>
        </div>

        <div className='prose my-4'>
          {documentToReactComponents(post.data.fields.body)}
        </div>
      </>
    )
  }
})
