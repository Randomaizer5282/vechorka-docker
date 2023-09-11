<?php

function get_client_revalidate($type)
{
  if (!CLIENT_REVALIDATE_URL || !CLIENT_REVALIDATE_KEY) {
    return null;
  }

  return wp_remote_get(
    //REVALIDATE_URL . '?token=' . REVALIDATE_TOKEN . '&postType=' . $post->post_type . '&slug=' . $post->post_name,
    CLIENT_REVALIDATE_URL . '?key=' . CLIENT_REVALIDATE_KEY . '&type=' . $type,
    [
      'timeout' => 120,
      'httpversion' => '1.1'
    ]
  );
}

// edit posts
add_action('save_post', 'save_post_action', 10, 3);
function save_post_action($post_id, $post, $update)
{
  if (!CLIENT_REVALIDATE_URL || !CLIENT_REVALIDATE_KEY || $post->post_status == 'auto-draft') {
    return;
  }

  if ($post->post_type == "post" || $post->post_type == "article" || $post->post_type == "advert") {
    $response = get_client_revalidate($post->post_type);
  }
}

//add_action('added_post_meta', 'revalidate_post_meta', 10, 4);
//add_action('updated_post_meta', 'revalidate_post_meta', 10, 4);
//add_action('deleted_post_meta', 'revalidate_post_meta', 10, 4);
//function revalidate_post_meta($meta_id, $post_id, $meta_key, $meta_value)
//{
////    echo '<pre>';
////    var_dump($meta_key);
//    $response = get_client_revalidate('posts_meta');
//    if ($meta_key != '_edit_lock') {
//    }
//
////    echo '<pre>';
////    var_dump('revalidate_post_meta');
//}

// edit category
add_action('saved_category', 'saved_category_action', 10, 4);
add_action('delete_category', 'saved_category_action', 10, 4);
function saved_category_action($term, $tt_id, $deleted_term, $object_ids)
{
  $response = get_client_revalidate('category');
}

// edit post_geography
add_action('saved_post_geography', 'saved_post_geography_action', 10, 4);
add_action('delete_post_geography', 'saved_post_geography_action', 10, 4);
function saved_post_geography_action($term_id, $tt_id, $update, $args)
{
  $response = get_client_revalidate('post_geography');
}

// edit comment
add_action('transition_comment_status', 'approve_comment_action', 10, 3);
function approve_comment_action($new_status, $old_status, $comment)
{
  if ($old_status != $new_status) {
    $response = get_client_revalidate('comment');
  }
}