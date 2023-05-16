<?php

// custom post types
function register_custom_post_type()
{
  register_post_type('article', array(
    'label' => 'Статьи',
    'labels' => array(
      'name' => 'Статьи',
      'singular_name' => 'Статьи',
      'menu_name' => 'Статьи',
      'all_items' => 'Все статьи',
      'add_new' => 'Добавить статью',
      'add_new_item' => 'Добавить статью',
      'edit' => 'Редактировать',
      'edit_item' => 'Редактировать статью',
      'new_item' => 'Новая статья',
    ),
    'taxonomies' => ['post_tag'],
    'description' => '',
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_rest' => false,
    'rest_base' => '',
    'show_in_menu' => true,
    'show_in_nav_menus' => true,
    'exclude_from_search' => true,
    'capability_type' => 'post',
    'map_meta_cap' => true,
    'hierarchical' => false,
    'has_archive' => true,
    'can_export' => true,
    'query_var' => true,
    // 'supports' => array('title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields',),
    'supports' => array('title', 'editor', 'excerpt', 'author', 'thumbnail'),
    'menu_position' => 4,
    'menu_icon' => 'dashicons-text-page',
  ));

  register_post_type('video', array(
    'label' => 'Видео',
    'labels' => array(
      'name' => 'Видео',
      'singular_name' => 'Видео',
      'menu_name' => 'Видео',
      'all_items' => 'Все видео',
      'add_new' => 'Добавить видео',
      'add_new_item' => 'Добавить видео',
      'edit' => 'Редактировать видео',
      'edit_item' => 'Редактировать видео',
      'new_item' => 'Новое видео',
    ),
    'description' => '',
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_rest' => false,
    'rest_base' => '',
    'show_in_menu' => true,
    'exclude_from_search' => true,
    'capability_type' => 'post',
    'map_meta_cap' => true,
    'hierarchical' => false,
    //'rewrite'             => array('slug' => 'service', 'with_front' => true, 'pages'=>false, 'feeds'=>false, 'feed'=>false),
    'has_archive' => true,
    'can_export' => true,
    'query_var' => true,
    'supports' => array('title', 'editor', 'excerpt', 'author', 'thumbnail'),
    //'taxonomies'          => array( 'service' ),
    'menu_position' => 5,
    'menu_icon' => 'dashicons-video-alt3',
  ));

  register_post_type('newspaper', array(
    'label' => 'Газета',
    'labels' => array(
      'name' => 'Газета',
      'singular_name' => 'Газета',
      'menu_name' => 'Газета',
      'all_items' => 'Все выпуски',
      'add_new' => 'Добавить выпуск',
      'add_new_item' => 'Добавить выпуск',
      'edit' => 'Редактировать выпуск',
      'edit_item' => 'Редактировать выпуск',
      'new_item' => 'Новый выпуск',
    ),
    'description' => '',
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_rest' => false,
    'rest_base' => '',
    'show_in_menu' => true,
    'exclude_from_search' => true,
    'capability_type' => 'post',
    'map_meta_cap' => true,
    'hierarchical' => false,
    'has_archive' => true,
    'can_export' => true,
    'query_var' => true,
    'supports' => array('title', 'editor'),
    'menu_position' => 7,
    'menu_icon' => 'dashicons-calendar',
  ));

  register_post_type('advert', array(
    'label' => 'Реклама',
    'labels' => array(
      'name' => 'Реклама',
      'singular_name' => 'Реклама',
      'menu_name' => 'Реклама',
      'all_items' => 'Вся реклама',
      'add_new' => 'Добавить рекламное место',
      'add_new_item' => 'Добавить рекламное место',
      'edit' => 'Редактировать рекламное место',
      'edit_item' => 'Редактировать рекламное место',
      'new_item' => 'Новое рекламное место',
    ),
    'description' => '',
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_rest' => false,
    'rest_base' => '',
    'show_in_menu' => true,
    'exclude_from_search' => true,
    'capability_type' => 'post',
    'map_meta_cap' => true,
    'hierarchical' => false,
    'has_archive' => true,
    'can_export' => true,
    'query_var' => true,
    'supports' => array('title'),
    'menu_position' => 8,
    'menu_icon' => 'dashicons-megaphone',
  ));

  register_post_type('poll', array(
    'label' => 'Опросы',
    'labels' => array(
      'name' => 'Опросы',
      'singular_name' => 'Опросы',
      'menu_name' => 'Опросы',
      'all_items' => 'Все опросы',
      'add_new' => 'Добавить опрос',
      'add_new_item' => 'Добавить опрос',
      'edit' => 'Редактировать опрос',
      'edit_item' => 'Редактировать опрос',
      'new_item' => 'Новый опрос',
    ),
    'description' => '',
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_rest' => false,
    'rest_base' => '',
    'show_in_menu' => true,
    'exclude_from_search' => true,
    'capability_type' => 'post',
    'map_meta_cap' => true,
    'hierarchical' => false,
    'has_archive' => true,
    'can_export' => true,
    'query_var' => true,
    'supports' => array('title'),
    'menu_position' => 9,
    'menu_icon' => 'dashicons-chart-bar',
  ));

  register_post_type('employee', array(
    'label' => 'Сотрудники',
    'labels' => array(
      'name' => 'Сотрудники',
      'singular_name' => 'Сотрудники',
      'menu_name' => 'Сотрудники',
      'all_items' => 'Все сотрудники',
      'add_new' => 'Добавить сотрудника',
      'add_new_item' => 'Добавить сотрудника',
      'edit' => 'Редактировать сотрудника',
      'edit_item' => 'Редактировать сотрудника',
      'new_item' => 'Новый сотрудник',
    ),
    'description' => '',
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_rest' => false,
    'rest_base' => '',
    'show_in_menu' => true,
    'exclude_from_search' => true,
    'capability_type' => 'post',
    'map_meta_cap' => true,
    'hierarchical' => false,
    //'rewrite'             => array('slug' => 'service', 'with_front' => true, 'pages'=>false, 'feeds'=>false, 'feed'=>false),
    'has_archive' => true,
    'can_export' => true,
    'query_var' => true,
    'supports' => array('title', 'thumbnail'),
    //'taxonomies'          => array( 'service' ),
    'menu_position' => 10,
    'menu_icon' => 'dashicons-groups',
  ));
}

add_action('init', 'register_custom_post_type');

/**
 * Remove Tutorial Custom Post Type Comments
 */
function remove_custom_post_type_comments()
{
  remove_post_type_support('article', 'comments');
}

add_action('init', 'remove_custom_post_type_comments');


/*
 * Change 'post' name to 'News'
 */
function change_edit_admin_menus()
{
  global $menu;
  global $submenu;

  $menu[5][0] = 'Новости';
  $submenu['edit.php'][5][0] = 'Все новости';
  $submenu['edit.php'][10][0] = 'Добавить новость';
}

add_action('admin_menu', 'change_edit_admin_menus');

function change_post_object()
{
  global $wp_post_types;
  $labels = &$wp_post_types['post']->labels;
  $wp_post_types['post']->menu_icon = 'dashicons-admin-site';

  $labels->name = 'Новости';
  $labels->singular_name = 'Новости';
  $labels->add_new = 'Добавить новость';
  $labels->add_new_item = 'Добавить новость';
  $labels->edit_item = 'Редактировать новость';
  $labels->new_item = 'Новость';
  $labels->view_item = 'Просмотр новости';
  $labels->search_items = 'Поиск новости';
  $labels->not_found = 'Новости не найдены';
  $labels->not_found_in_trash = 'Новости не найдены';
  $labels->all_items = 'Все новости';
  $labels->menu_name = 'Новости';
  $labels->name_admin_bar = 'Новости';
}

add_action('init', 'change_post_object');

// change order admin menu items
function wpse_custom_menu_order($menu_ord)
{
  if (!$menu_ord) return true;

  return array(
    'index.php', // Dashboard
    'separator1', // First separator
    'edit.php', // Posts
    'edit.php?post_type=article',
    'edit.php?post_type=video',
    'edit.php?post_type=page', // Pages
    'edit-comments.php', // Comments
    'upload.php', // Media
    'edit.php?post_type=newspaper', // Newspaper
    'edit.php?post_type=poll', // polls
    'edit.php?post_type=advert', // advertisement
    'edit.php?post_type=employee', // Employee
    'link-manager.php', // Links
    'separator2', // Second separator
    'themes.php', // Appearance
    'plugins.php', // Plugins
    'users.php', // Users
    'tools.php', // Tools
    'options-general.php', // Settings
    'separator-last', // Last separator
  );
}

add_filter('custom_menu_order', 'wpse_custom_menu_order', 10, 1);
add_filter('menu_order', 'wpse_custom_menu_order', 10, 1);

/**
 * Add custom taxonomies
 *
 * Additional custom taxonomies can be defined here
 * https://codex.wordpress.org/Function_Reference/register_taxonomy
 */
function add_custom_taxonomies()
{
  // Add new "Locations" taxonomy to Posts
  register_taxonomy('post_geography', 'post', array(
    // Hierarchical taxonomy (like categories)
    'hierarchical' => false,
    'show_admin_column' => true,
    // This array of options controls the labels displayed in the WordPress Admin UI
    'labels' => array(
      'name' => __('География'),
      'singular_name' => __('География'),
      'search_items' => __('Найти по географии'),
      'all_items' => __('Все метки географии'),
      // 'parent_item' => __( 'Parent Location' ),
      // 'parent_item_colon' => __( 'Parent Location:' ),
      'edit_item' => __('Редактирова метку'),
      'update_item' => __('Обновить метку'),
      'add_new_item' => __('Добавить новую метку'),
      'new_item_name' => __('Имя метки'),
      'menu_name' => __('География'),
    ),
    // Control the slugs used for this taxonomy
    'rewrite' => array(
      'slug' => 'post_geography', // This controls the base slug that will display before each term
      'with_front' => false, // Don't display the category base before "/locations/"
      'hierarchical' => true, // This will allow URL's like "/locations/boston/cambridge/"
    ),
  ));
}

add_action('init', 'add_custom_taxonomies', 0);

/**
 * Display a custom taxonomy dropdown in admin
 * @author Mike Hemberger
 * @link http://thestizmedia.com/custom-post-type-filter-admin-custom-taxonomy/
 */
function tsm_filter_post_type_by_taxonomy()
{
  global $typenow;
  $post_type = 'post'; // change to your post type
  $taxonomy = 'post_geography'; // change to your taxonomy
  if ($typenow == $post_type) {
    $selected = isset($_GET[$taxonomy]) ? $_GET[$taxonomy] : '';
    $info_taxonomy = get_taxonomy($taxonomy);
    wp_dropdown_categories(array(
      'show_option_all' => sprintf(__('Все %s', 'vechorka'), $info_taxonomy->label),
      'taxonomy' => $taxonomy,
      'name' => $taxonomy,
      'orderby' => 'name',
      'selected' => $selected,
      'show_count' => true,
      'hide_empty' => true,
    ));
  };
}

add_action('restrict_manage_posts', 'tsm_filter_post_type_by_taxonomy');

//
// add prefix news to post
//
/**
 * @param string  $permalink The site's permalink structure.
 * @param WP_Post $post      The post in question.
 * @param bool    $leavename Whether to keep the post name.
 */
function se332921_pre_post_link($permalink, $post, $leavename)
{
  if ( $post instanceof WP_Post && $post->post_type == 'post')
    $permalink = '/news'.$permalink;
  return $permalink;
}

/**
 * @param array $post_rewrite The rewrite rules for posts.
 */
function se332921_post_rewrite_rules($post_rewrite)
{
  if ( is_array($post_rewrite) )
  {
    $rw_prefix = [];
    foreach( $post_rewrite as $k => $v) {
      $rw_prefix[ 'news/'.$k] = $v;
    }
    //
    // merge to keep original rules
    $post_rewrite = array_merge($rw_prefix, $post_rewrite);
    //
    // or return only prefixed:
    // $post_rewrite = $rw_prefix;
  }
  return $post_rewrite;
}
add_filter('pre_post_link', 'se332921_pre_post_link', 20, 3);
add_filter('post_rewrite_rules', 'se332921_post_rewrite_rules');

/**
 * Filter posts by taxonomy in admin
 * @author  Mike Hemberger
 * @link http://thestizmedia.com/custom-post-type-filter-admin-custom-taxonomy/
 */
function tsm_convert_id_to_term_in_query($query)
{
  global $pagenow;
  $post_type = 'post'; // change to your post type
  $taxonomy = 'post_geography'; // change to your taxonomy
  $q_vars = &$query->query_vars;
  if ($pagenow == 'edit.php' && isset($q_vars['post_type']) && $q_vars['post_type'] == $post_type && isset($q_vars[$taxonomy]) && is_numeric($q_vars[$taxonomy]) && $q_vars[$taxonomy] != 0) {
    $term = get_term_by('id', $q_vars[$taxonomy], $taxonomy);
    $q_vars[$taxonomy] = $term->slug;
  }
}

add_filter('parse_query', 'tsm_convert_id_to_term_in_query');