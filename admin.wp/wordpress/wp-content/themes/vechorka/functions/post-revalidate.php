<?php

function get_client_revalidate($type, $slug = null)
{
  if (!CLIENT_REVALIDATE_URL || !CLIENT_REVALIDATE_KEY) {
    return null;
  }

  wp_remote_get(
    CLIENT_REVALIDATE_URL . '?key=' . CLIENT_REVALIDATE_KEY . '&type=' . $type . ($slug ? '&slug=' . $slug : ""),
    [
      'timeout' => 3,
      'httpversion' => '1.1',
      'blocking' => false,
      'sslverify' => false,
    ]
  );
}


// get original post
add_action('pre_post_update', function ($post_id, $post_data) {
  global $is_multiply;
  global $original_post;
  $original_post = get_post($post_id);
}, 10, 2);


function prepare_edit_post($post): void
{

//  // Check autosave.
//  if ( wp_is_post_autosave( $post_id ) ) {
//    return $post_id;
//  }
//
//  // Check post revision.
//  if ( wp_is_post_revision( $post_id ) ) {
//    return $post_id;
//  }

  global $is_multiply;
  global $original_post;
  $slug = $original_post->post_name;

  if ($post->post_status == 'auto-draft' || $post->post_type == 'revision') {
    return;
  }

  // new insert post
  if (!$slug) {
    $slug = $post->post_name;
  }

  // remove post
  if ($post->post_status == "trash" || $original_post->post_status == "trash") {
    $slug = str_replace("__trashed", "", $post->post_name);
  }

  if ($post->post_type === "page") {
    get_client_revalidate($post->post_type, $slug);
  } else {
    // if multiply post (news), get one request to client for revalidate
    // another send many request to client revalidate
    if (!$is_multiply) {
      get_client_revalidate($post->post_type);
    }
  }

  $is_multiply = true;
}

// crud action posts pages
add_action('edit_post_page', 'edit_post_page_action', 10, 3);
function edit_post_page_action($post_id, $post): void
{
  prepare_edit_post($post);
}


// crud action past - news
add_action('edit_post_post', 'edit_post_post_action', 10, 3);
function edit_post_post_action($post_id, $post): void
{
  prepare_edit_post($post);
}

// crud action past - article
add_action('edit_post_article', 'edit_post_article_action', 10, 3);
function edit_post_article_action($post_id, $post): void
{
  prepare_edit_post($post);
}

// crud action past - employee, usage on contact page
add_action('edit_post_employee', 'edit_post_employee_action', 10, 3);
function edit_post_employee_action($post_id, $post): void
{
  prepare_edit_post($post);
}

// crud action past - newspaper
add_action('edit_post_newspaper', 'edit_post_newspaper_action', 10, 3);
function edit_post_newspaper_action($post_id, $post): void
{
  prepare_edit_post($post);
}

// crud action past - advert
add_action('edit_post_advert', 'edit_post_advert_action', 10, 3);
function edit_post_advert_action($post_id, $post): void
{
  prepare_edit_post($post);
}

// crud action category
add_action('saved_category', 'saved_category_action', 10, 4);
add_action('delete_category', 'saved_category_action', 10, 4);
function saved_category_action($term, $tt_id, $deleted_term, $object_ids)
{
  global $is_multiply;
  if (!$is_multiply) {
    get_client_revalidate('post_category');
  }
  $is_multiply = true;
}

// crud action post_geography
add_action('saved_post_geography', 'saved_post_geography_action', 10, 4);
add_action('delete_post_geography', 'saved_post_geography_action', 10, 4);
function saved_post_geography_action($term_id, $tt_id, $update, $args)
{
  global $is_multiply;
  if (!$is_multiply) {
    get_client_revalidate('post_geography');
  }
  $is_multiply = true;
}

// crud action tag
add_action('saved_post_tag', 'saved_post_tag_action', 10, 4);
add_action('delete_post_tag', 'saved_post_tag_action', 10, 4);
function saved_post_tag_action($term_id, $tt_id, $update, $args)
{
  global $is_multiply;
  if (!$is_multiply) {
    get_client_revalidate('post_tag');
  }
  $is_multiply = true;
}

// change comment status
//add_action('transition_comment_status', 'approve_comment_action', 10, 3);
//function approve_comment_action($new_status, $old_status, $comment)
//{
//  var_dump("===edit_comment");
//
//  if ($old_status != $new_status) {
//    $response = get_client_revalidate('comment');
//  }
//}

// add button to wp-admin-bar-root-default
add_action('admin_footer', 'admin_bar_revalidate_button');
function admin_bar_revalidate_button()
{
  //  $screen = get_current_screen();
  ?>
  <script>
      const CLIENT_REVALIDATE_URL = `<?php echo CLIENT_REVALIDATE_URL ?>`
      const CLIENT_REVALIDATE_KEY = `<?php echo CLIENT_REVALIDATE_KEY ?>`
      jQuery(function ($) {
          const save_menu_button = $("#wp-admin-bar-root-default");
          save_menu_button.append('<li id="clear_cache_button_item"><a href="#" id="clear_cache_button" class="button button-primary button-large">Очистить кеш клиента</a></li>');
          save_menu_button.append('<span id="clear_cache_loader" style="position: fixed; top:0; left:0; right:0; bottom:0; align-items: center; justify-content: center; background: #000000; opacity: 30; z-index: 1000; display: none; color: white;">Очистка кеша клиента</span>');
          const loader = document.getElementById("clear_cache_loader");
          save_menu_button.parent().on("click", "#clear_cache_button", function (e) {
              e.preventDefault();
              if (CLIENT_REVALIDATE_URL && CLIENT_REVALIDATE_KEY) {
                  loader.style.display = "flex";

                  fetch("<?php echo esc_url(home_url()) . '/wp-admin/admin-ajax.php?action=revalidate_all' ?>", {
                      method: "GET",
                  })
                      .then(response => response.ok ? alert("Кеш очищен") : alert("При обновлении кеша произошла ошибка"))
                      .catch(e => {
                          alert("При обновлении кеша произошла ошибка");
                          console.log(e)
                      })
                      .finally(() => loader.style.display = "none");
              }
          });
      });
  </script>
  <?php
}

add_action('wp_ajax_revalidate_all', 'revalidate_all_action');

function revalidate_all_action()
{
  get_client_revalidate("all");
  exit(); // this is required to return a proper result
} ?>