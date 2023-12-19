<?php
// change preview url to api client preview
function change_preview_post_link( $preview_link, $post ){
  if (!CLIENT_PREVIEW_URL || !CLIENT_SECRET) {
    return $preview_link;
  }
  $type = $post->post_type;
  $id = $post->ID;
  return CLIENT_PREVIEW_URL . '?key=' . CLIENT_SECRET . '&type=' . $type . ($id ? '&id=' . $id : "");
}

add_filter( 'preview_post_link', 'change_preview_post_link', 10, 2 );
