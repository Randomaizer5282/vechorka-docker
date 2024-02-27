<?php
// Add the custom columns to the post type:
add_filter('manage_post_posts_columns', 'set_custom_edit_post_columns');
function set_custom_edit_post_columns($columns)
{
  $columns['views'] = "Просмотры";
  return $columns;
}

// Add the data to the custom columns for the post type:
add_action('manage_post_posts_custom_column', 'custom_post_column', 10, 2);
function custom_post_column($column, $post_id)
{
  $meta_views = get_post_meta($post_id, "views", true);
  echo $meta_views;
}

// Add the custom columns to the post type:
add_filter('manage_article_posts_columns', 'set_custom_edit_article_columns');
function set_custom_edit_article_columns($columns)
{
  $columns['views'] = "Просмотры";
  echo '<pre>';
  var_dump($columns);
  return $columns;
}

// Add the data to the custom columns for the post type:
add_action('manage_article_posts_custom_column', 'custom_article_column', 10, 2);
function custom_article_column($column, $post_id)
{
  $meta_views = get_post_meta($post_id, "views", true);
  echo $meta_views;
}

// column styles
add_action('admin_head', 'style_column');
function style_column() {
  echo '<style>';
  echo '.column-views { width:120px !important; overflow:hidden }';
  echo '</style>';
}