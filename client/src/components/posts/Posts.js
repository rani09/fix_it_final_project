import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    document.title = 'Posts';
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='flex-box'>
        <div className='flex-box-content'>
          <aside className='aside aside-1'>
            <div className='search-wrapper mb-1'>
              <div className='label'>Søg på Fix it</div>
              <div className='searchBar'>
                <input
                  id='searchQueryInput'
                  type='text'
                  name='searchQueryInput'
                  placeholder='Søg her...'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button
                  id='searchQuerySubmit'
                  type='submit'
                  name='searchQuerySubmit'
                >
                  <svg className='search-svg' viewBox='0 0 24 24'>
                    <path
                      fill='#666666'
                      d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </aside>
          <section className='main-content'>
            <PostForm />

            {posts
              .filter(
                post =>
                  post.text.toLowerCase().includes(search.toLowerCase()) ||
                  post.title.toLowerCase().includes(search.toLowerCase())
              )
              .map(post => (
                <PostItem key={post._id} post={post} />
              ))}
          </section>
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
