import * as React from 'react';
import { Link } from 'gatsby';

const BlogPost = ({ pageContext }: any) => {
  return (
    <div>
      <h1>{pageContext.title.title}</h1>
      <p>
        <img
          src={pageContext.titleImage.file.url}
          alt={pageContext.titleImage.title}
        />
      </p>
      <p>{pageContext.bodyParsed.content[0].content[0].value}</p>
      <ul>
        <li>
          <Link to="/">Take me back home.</Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogPost;
