<?php
/**
 * Postales Papa León XIV - Funciones del Tema
 *
 * @package Chiclayo-Tema
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * 1. Inicializar Valores Predeterminados de las 21 Postales
 */
function cp_theme_get_default_postales() {
    $theme_uri = get_template_directory_uri() . '/dist/assets/';
    return [
        ["num" => "001", "nombre" => "Genaro Zeta", "edad" => "71 años", "msg" => "Al Padre León XIV. Mundo, te saludo desde el Perú.", "foto" => $theme_uri . "postal_001.jpg"],
        ["num" => "002", "nombre" => "Mónica Alva Guerrero", "edad" => "54 años", "msg" => "Mi querido Papa, feliz aniversario. Vida, salud, que siga recorriendo el mundo, que no olvide a los más necesitados. ¡Visita el Perú!", "foto" => $theme_uri . "postal_002.jpg"],
        ["num" => "003", "nombre" => "María Teresa Llatas Torres", "edad" => "62 años", "msg" => "Mi querido Padre. Gracias por la calidez y humildad. Cerca de nosotros, nos alegra mucho. Te queremos, Padre, te amamos y te guardamos.", "foto" => $theme_uri . "postal_003.jpg"],
        ["num" => "004", "nombre" => "Carolina Vásquez Mendoza", "edad" => "", "msg" => "Mi querido Papa podirte y desearte que todo te vaya bien, podirte que cuides mucho a mi hija a mi abuejo que se cuando entre a operarsen que todo le vaya bien.", "foto" => $theme_uri . "postal_004.jpg"],
        ["num" => "005", "nombre" => "Luis Gabriel García Balta", "edad" => "", "msg" => "Santo Padre que Dios lo Bendiga Siempre.", "foto" => $theme_uri . "postal_005.jpg"],
        ["num" => "006", "nombre" => "Daniela Cano Horna", "edad" => "", "msg" => "Te pido por mi familia, que todos estemos y gocemos de salud. ★", "foto" => $theme_uri . "postal_006.jpg"],
        ["num" => "007", "nombre" => "Valeria Alessandra Asenjo Adrianzén", "edad" => "", "msg" => "Señor te pido por mi familia, por mis amigos y por mí, que nos protejas y nos ayudes. Que me des salud para lograr todos mis metas y que me vaya bien en el trabajo.", "foto" => $theme_uri . "postal_007.jpg"],
        ["num" => "008", "nombre" => "Joucita Rosa Quispe Morales", "edad" => "", "msg" => "Padre a ud. le pido de todo corazón que siempre nos guíe a tener la paz y el amor a la familia y que siempre estemos iluminados por el buen camino, mi familia y el mundo.", "foto" => $theme_uri . "postal_008.jpg"],
        ["num" => "009", "nombre" => "Lisset Carrasco", "edad" => "", "msg" => "Soy Abigail y soy seguidora de Jesús. Te pido ores por mi familia, mi vida y mi labor como médico. Un abrazo cálido desde Chiclayo.", "foto" => $theme_uri . "postal_009.jpg"],
        ["num" => "010", "nombre" => "Vanessa Chávez Chira", "edad" => "", "msg" => "Muchas gracias por bendecir a esta ciudad y gracias por siempre tenernos en sus oraciones. Que Dios siempre derrame bendiciones a usted su vida. → Vanessa.", "foto" => $theme_uri . "postal_010.jpg"],
        ["num" => "011", "nombre" => "Brunella Fuentes", "edad" => "", "msg" => "Tuve dicha de conocerlo y escucharlo en el Santuario junto a mi esposo. Bendice mi hogar, a mi familia y a las personas que amo. Que tu amor por Chiclayo siga bendiciendo esta ciudad.", "foto" => $theme_uri . "postal_011.jpg"],
        ["num" => "012", "nombre" => "Marco Antonio", "edad" => "", "msg" => "Agradeciente por tu labor pastoral. Bendice nuestros hogares y a cada una de las familias necesitadas. Un abrazo fraternal. Tu amigo Marco A.", "foto" => $theme_uri . "postal_012.jpg"],
        ["num" => "013", "nombre" => "Marco Torres", "edad" => "", "msg" => "Dios lo ilumine en todo momento. Gracias por tener en sus oraciones a nuestro Perú.", "foto" => $theme_uri . "postal_013.jpg"],
        ["num" => "014", "nombre" => "Ruth Vega Ballona", "edad" => "", "msg" => "Dios lo cuide siempre y lo ilumine para que sea nuestro guía espiritual. Al Perú tenga presente en sus oraciones.", "foto" => $theme_uri . "postal_014.jpg"],
        ["num" => "015", "nombre" => "Guillermo Sosa Llontop", "edad" => "", "msg" => "En Semana Santa 2021 le entregué con mucho amor su Pondencia 'Estatuilla La Espada del Espíritu'. Padre le deseo lo mejor del mundo.", "foto" => $theme_uri . "postal_015.jpg"],
        ["num" => "016", "nombre" => "Janet Aldana Fernández", "edad" => "", "msg" => "Que Dios y la Virgen María sean siempre la guía en su Pontificado. Saludos desde la Capital de la Amistad, Chiclayo.", "foto" => $theme_uri . "postal_016.jpg"],
        ["num" => "017", "nombre" => "Ana Karen Rinza Reyes", "edad" => "", "msg" => "Que Dios siempre guarde la paz y esperanza de la ciudad de Chiclayo. Que Dios Bendiga siempre.", "foto" => $theme_uri . "postal_017.jpg"],
        ["num" => "018", "nombre" => "Andrea Arévalo", "edad" => "", "msg" => "Te queremos mucho y te esperamos, gracias a ti mi madre se pudo casar antes de que mi abuela falleciera, te amamos mucho.", "foto" => $theme_uri . "postal_018.jpg"],
        ["num" => "019", "nombre" => "Hilda Inope Arteaga", "edad" => "", "msg" => "Recibe mi saludo y a la vez deseo que siempre estés bendecido e iluminado por el Espíritu Santo para que no te falte salud, sabiduría y amor.", "foto" => $theme_uri . "postal_019.jpg"],
        ["num" => "020", "nombre" => "Diana Limo Inope", "edad" => "", "msg" => "Un cariñoso saludo para ti deseando que Dios bendiga tu labor pastoral. Te quiero mucho y estamos orgullosos de que seas Chiclayano.", "foto" => $theme_uri . "postal_020.jpg"],
        ["num" => "021", "nombre" => "Marisol Eca Puescas", "edad" => "", "msg" => "Un abrazo y cariño infinito para ti mi Robert. Desde Santa Rosa 'caleta'. Que Dios siempre te cuide y reza mucho por mí, mi salud y la unión de mi familia. Feliz de tenerte en Roma.", "foto" => $theme_uri . "postal_021.jpg"]
    ];
}

/**
 * 2. Registrar el Custom Post Type "postal" para edición 100% nativa en WordPress
 */
function cp_theme_register_postal_cpt() {
    register_post_type( 'postal', [
        'labels' => [
            'name'                  => 'Postales del Papa',
            'singular_name'         => 'Postal',
            'menu_name'             => 'Postales del Papa',
            'all_items'             => 'Todas las Postales',
            'add_new'               => 'Añadir Nueva',
            'add_new_item'          => 'Añadir Nueva Postal',
            'edit_item'             => 'Editar Postal',
            'new_item'              => 'Nueva Postal',
            'view_item'             => 'Ver Postal',
            'search_items'          => 'Buscar Postales',
            'not_found'             => 'No se encontraron postales',
            'not_found_in_trash'    => 'No hay postales en la papelera',
        ],
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => [ 'slug' => 'postales' ],
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'        => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-email-alt',
        'supports'           => [ 'title', 'editor', 'thumbnail' ],
        'show_in_rest'       => true, // Habilitar Gutenberg Block Editor nativo para postales!
    ]);
}
add_action( 'init', 'cp_theme_register_postal_cpt' );

/**
 * 3. Registrar Meta Boxes para editar detalles adicionales (número de postal y edad) de forma nativa
 */
function cp_theme_add_postal_metaboxes() {
    add_meta_box(
        'cp_theme_postal_details',
        'Datos Clave de la Postal',
        'cp_theme_postal_metabox_render',
        'postal',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'cp_theme_add_postal_metaboxes' );

function cp_theme_postal_metabox_render( $post ) {
    wp_nonce_field( 'cp_theme_postal_save_action', 'cp_theme_postal_nonce' );
    $num = get_post_meta( $post->ID, '_postal_num', true );
    $edad = get_post_meta( $post->ID, '_postal_edad', true );
    $foto_url = get_post_meta( $post->ID, '_postal_foto_url', true );
    ?>
    <div style="padding: 10px 0;">
        <p style="margin-bottom: 15px;">
            <label for="cp_postal_num" style="display: block; font-weight: bold; margin-bottom: 5px;">Número correlativo (Ej. 001):</label>
            <input type="text" id="cp_postal_num" name="cp_postal_num" value="<?php echo esc_attr( $num ); ?>" style="width: 100%; max-width: 150px; padding: 6px; font-size: 14px;" placeholder="Ej: 001" />
        </p>
        <p style="margin-bottom: 15px;">
            <label for="cp_postal_edad" style="display: block; font-weight: bold; margin-bottom: 5px;">Edad / Adicional (Ej. 71 años):</label>
            <input type="text" id="cp_postal_edad" name="cp_postal_edad" value="<?php echo esc_attr( $edad ); ?>" style="width: 100%; max-width: 250px; padding: 6px; font-size: 14px;" placeholder="Ej: 71 años" />
        </p>
        <p>
            <label for="cp_postal_foto_url" style="display: block; font-weight: bold; margin-bottom: 5px;">Enlace de la Foto o Google Drive (Ej: Enlace de compartir de Drive):</label>
            <input type="text" id="cp_postal_foto_url" name="cp_postal_foto_url" value="<?php echo esc_url( $foto_url ); ?>" style="width: 100%; padding: 6px; font-size: 14px;" placeholder="https://drive.google.com/file/d/... o URL directo" />
            <span style="display: block; color: #666; font-size: 11px; margin-top: 4px;">¡Soporte automático para enlaces de compartir de Google Drive! El tema convertirá el enlace para que sea visible directamente en la web.</span>
        </p>
    </div>
    <?php
}

function cp_theme_save_postal_meta( $post_id ) {
    if ( ! isset( $_POST['cp_theme_postal_nonce'] ) || ! wp_verify_nonce( $_POST['cp_theme_postal_nonce'], 'cp_theme_postal_save_action' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['cp_postal_num'] ) ) {
        update_post_meta( $post_id, '_postal_num', sanitize_text_field( $_POST['cp_postal_num'] ) );
    }
    if ( isset( $_POST['cp_postal_edad'] ) ) {
        update_post_meta( $post_id, '_postal_edad', sanitize_text_field( $_POST['cp_postal_edad'] ) );
    }
    if ( isset( $_POST['cp_postal_foto_url'] ) ) {
        update_post_meta( $post_id, '_postal_foto_url', esc_url_raw( $_POST['cp_postal_foto_url'] ) );
    }
}
add_action( 'save_post', 'cp_theme_save_postal_meta' );

/**
 * Función Auxiliar: Convierte automáticamente enlaces de compartir de Google Drive en URLs directas
 */
function cp_theme_clean_drive_url( $url ) {
    if ( empty( $url ) ) {
        return '';
    }
    
    // Si contiene /file/d/ID/view...
    if ( preg_match( '/\/file\/d\/([a-zA-Z0-9_-]+)/', $url, $matches ) ) {
        return 'https://lh3.googleusercontent.com/d/' . $matches[1];
    }
    
    // Si contiene ?id=ID...
    if ( preg_match( '/[?&]id=([a-zA-Z0-9_-]+)/', $url, $matches ) ) {
        return 'https://lh3.googleusercontent.com/d/' . $matches[1];
    }
    
    return $url;
}

/**
 * 4. Obtener las postales dinámicas de WordPress. Si no hay elementos en la base de datos,
 * recurrir al fallback automatizado de las 21 postales precargadas originalmente.
 */
function cp_theme_get_dynamic_postales() {
    $args = [
        'post_type'      => 'postal',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'meta_value',
        'meta_key'       => '_postal_num',
        'order'          => 'ASC'
    ];
    
    $query = new WP_Query( $args );
    $postales = [];
    
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $num = get_post_meta( get_the_ID(), '_postal_num', true );
            $edad = get_post_meta( get_the_ID(), '_postal_edad', true );
            $custom_foto = get_post_meta( get_the_ID(), '_postal_foto_url', true );
            
            $foto = '';
            if ( ! empty( $custom_foto ) ) {
                $foto = cp_theme_clean_drive_url( $custom_foto );
            } else {
                $foto = get_the_post_thumbnail_url( get_the_ID(), 'full' );
            }
            
            // Si el post no cuenta con miniatura/imagen destacada ni URL externa, estimar el archivo original
            if ( ! $foto ) {
                $clean_num = sprintf( "%03d", intval( $num ) );
                $foto = get_template_directory_uri() . '/dist/assets/postal_' . $clean_num . '.jpg';
            }
            
            $postales[] = [
                "num"    => $num ? $num : sprintf( "%03d", get_the_ID() ),
                "nombre" => get_the_title(),
                "edad"   => $edad,
                "msg"    => get_the_content(),
                "foto"   => $foto
            ];
        }
        wp_reset_postdata();
    }
    
    if ( empty( $postales ) ) {
        return cp_theme_get_default_postales();
    }
    
    return $postales;
}

/**
 * 5. Extraer y estructurar datos del editor Gutenberg (Page Blocks) para que la página sea editable en bloques
 */
function cp_theme_add_page_metaboxes() {
    add_meta_box(
        'cp_theme_page_details',
        'Foto de Portada / Hero Image (Papa León XIV)',
        'cp_theme_page_metabox_render',
        'page',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'cp_theme_add_page_metaboxes' );

function cp_theme_page_metabox_render( $post ) {
    wp_nonce_field( 'cp_theme_page_save_action', 'cp_theme_page_nonce' );
    $hero_foto = get_post_meta( $post->ID, '_page_hero_image_url', true );
    ?>
    <div style="padding: 10px 0;">
        <p>
            <label for="cp_page_hero_image_url" style="display: block; font-weight: bold; margin-bottom: 5px;">Enlace de la Foto Principal (Papa León XIV) o Google Drive:</label>
            <input type="text" id="cp_page_hero_image_url" name="cp_page_hero_image_url" value="<?php echo esc_url( $hero_foto ); ?>" style="width: 100%; padding: 6px; font-size: 14px;" placeholder="https://drive.google.com/file/d/... o URL directo" />
            <span style="display: block; color: #666; font-size: 11px; margin-top: 4px;">Permite cambiar la foto del Papa León XIV de la portada principal pegando un enlace de compartir de Google Drive o un enlace directo. Si se deja vacío, se utilizará la imagen destacada o la por defecto de la plantilla.</span>
        </p>
    </div>
    <?php
}

function cp_theme_save_page_meta( $post_id ) {
    if ( ! isset( $_POST['cp_theme_page_nonce'] ) || ! wp_verify_nonce( $_POST['cp_theme_page_nonce'], 'cp_theme_page_save_action' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['cp_page_hero_image_url'] ) ) {
        update_post_meta( $post_id, '_page_hero_image_url', esc_url_raw( $_POST['cp_page_hero_image_url'] ) );
    }
}
add_action( 'save_post', 'cp_theme_save_page_meta' );

function cp_theme_get_editable_page_data() {
    $page_id = get_option( 'page_on_front' );
    if ( ! $page_id && is_singular( 'page' ) ) {
        $page_id = get_the_ID();
    }
    
    $data = [
        'hero_title_accent'      => 'Lambayeque',
        'hero_title'             => "le escribe al\nPapa León XIV.",
        'hero_description'       => 'Un proyecto documental donde 500 ciudadanos escriben al Papa León XIV — Robert Francis Prevost — desde los lugares donde vivió, rezó y caminó en el norte peruano.',
        'hero_image'             => '',
        'manifesto_title'        => "Una postal.\nUn viaje.",
        'manifesto_blockquote'   => '“Un pueblo que lo vio llegar, que lo vio servir, y que hoy decide escribirle de vuelta.”',
        'manifesto_p1'           => 'En mayo de 2025, el cardenal Robert Francis Prevost fue elegido Obispo de Roma. Para el mundo, se convirtió en León XIV. Para Chiclayo y Lambayeque, siempre tuvo nombre, historia y presencia.',
        'manifesto_p2'           => 'Este proyecto convierte un acto cotidiano — tomarse una foto, escribirle al Papa — en un objeto físico sellado, numerado y custodiado. Cuando el archivo esté completo, viajará a Roma o será entregado al Santo Padre durante su visita a Chiclayo en noviembre de 2026.',
        'manifesto_p3'           => 'No es un evento. No es marketing. Es una crónica colectiva construida postal a postal, voz a voz, desde los territorios que el Papa León XIV conoció antes que el mundo.'
    ];

    if ( $page_id ) {
        // Buscar la foto específica de cabecera
        $custom_hero = get_post_meta( $page_id, '_page_hero_image_url', true );
        if ( ! empty( $custom_hero ) ) {
            $data['hero_image'] = cp_theme_clean_drive_url( $custom_hero );
        } else {
            $featured = get_the_post_thumbnail_url( $page_id, 'full' );
            if ( $featured ) {
                $data['hero_image'] = $featured;
            }
        }

        $post = get_post( $page_id );
        if ( $post && $post->post_content ) {
            $blocks = parse_blocks( $post->post_content );
            $headings = [];
            $paragraphs = [];
            $quotes = [];

            // Extraer títulos e textos recursivamente de los bloques de Gutenberg
            foreach ( $blocks as $block ) {
                if ( $block['blockName'] === 'core/heading' ) {
                    $headings[] = strip_tags( render_block( $block ) );
                } elseif ( $block['blockName'] === 'core/paragraph' ) {
                    $paragraphs[] = strip_tags( render_block( $block ) );
                } elseif ( $block['blockName'] === 'core/quote' ) {
                    $quotes[] = strip_tags( render_block( $block ) );
                }
            }

            // Mapeo inteligente de bloques ordenadamente en Gutenberg
            if ( count( $headings ) >= 1 ) {
                $data['hero_title'] = trim( $headings[0] );
            }
            if ( count( $paragraphs ) >= 1 ) {
                $data['hero_description'] = trim( $paragraphs[0] );
            }
            if ( count( $headings ) >= 2 ) {
                $data['manifesto_title'] = trim( $headings[1] );
            }
            if ( count( $quotes ) >= 1 ) {
                $data['manifesto_blockquote'] = trim( $quotes[0] );
            }
            if ( count( $paragraphs ) >= 2 ) {
                $data['manifesto_p1'] = trim( $paragraphs[1] );
            }
            if ( count( $paragraphs ) >= 3 ) {
                $data['manifesto_p2'] = trim( $paragraphs[2] );
            }
            if ( count( $paragraphs ) >= 4 ) {
                $data['manifesto_p3'] = trim( $paragraphs[3] );
            }
        }
    }

    return $data;
}

/**
 * 6. Inyectar datos globales de WordPress en el front-end del sitio - Autodetecta Postales y Bloques Nativos
 */
add_action( 'wp_head', 'cp_theme_inject_global_data', 1 );
function cp_theme_inject_global_data() {
    $db_data = cp_theme_get_dynamic_postales(); 
    $page_data = cp_theme_get_editable_page_data();
    echo '<script id="chiclayo-postales-data-head">
    window.wordpressPostalesData = ' . json_encode( $db_data ) . ';
    window.wordpressPageData = ' . json_encode( $page_data ) . ';
    window.chiclayoThemeUrl = "' . esc_url( get_template_directory_uri() ) . '";
    </script>' . "\n";
}

/**
 * Notificación De Setup Completo:
 * Los scripts index.css e index.js se cargan directamente en index.php para garantizar 
 * máxima fiabilidad web y evitar cualquier conflicto con plugins de cache/minificación.
 */

