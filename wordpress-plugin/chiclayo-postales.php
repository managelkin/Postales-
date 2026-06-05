<?php
/*
Plugin Name: Postales Papa León XIV - Integración Interactiva
Description: Exposición documental interactiva de las 21 Postales escritas para el Papa León XIV. Carga los datos de forma ultra-segura, rápida y directa en cualquier página mediante el shortcode [chiclayo_postales].
Version: 1.0.0
Author: Elkin Cabarcas Mora & AI Assistant
License: GPL2
Text Domain: chiclayo-postales
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * 1. Inicializar Valores Predeterminados
 */
function cp_get_default_postales_data() {
    $plugin_uri = plugins_url( 'dist/assets/', __FILE__ );
    return [
        ["num" => "001", "nombre" => "Genaro Zeta", "edad" => "71 años", "msg" => "Al Padre León XIV. Mundo, te saludo desde el Perú.", "foto" => $plugin_uri . "postal_001.jpg"],
        ["num" => "002", "nombre" => "Mónica Alva Guerrero", "edad" => "54 años", "msg" => "Mi querido Papa, feliz aniversario. Vida, salud, que siga recorriendo el mundo, que no olvide a los más necesitados. ¡Visita el Perú!", "foto" => $plugin_uri . "postal_002.jpg"],
        ["num" => "003", "nombre" => "María Teresa Llatas Torres", "edad" => "62 años", "msg" => "Mi querido Padre. Gracias por la calidez y humildad. Cerca de nosotros, nos alegra mucho. Te queremos, Padre, te amamos y te guardamos.", "foto" => $plugin_uri . "postal_003.jpg"],
        ["num" => "004", "nombre" => "Carolina Vásquez Mendoza", "edad" => "", "msg" => "Mi querido Papa podirte y desearte que todo te vaya bien, podirte que cuides mucho a mi hija a mi abuejo que se cuando entre a operarsen que todo le vaya bien.", "foto" => $plugin_uri . "postal_004.jpg"],
        ["num" => "005", "nombre" => "Luis Gabriel García Balta", "edad" => "", "msg" => "Santo Padre que Dios lo Bendiga Siempre.", "foto" => $plugin_uri . "postal_005.jpg"],
        ["num" => "006", "nombre" => "Daniela Cano Horna", "edad" => "", "msg" => "Te pido por mi familia, que todos estemos y gocemos de salud. ★", "foto" => $plugin_uri . "postal_006.jpg"],
        ["num" => "007", "nombre" => "Valeria Alessandra Asenjo Adrianzén", "edad" => "", "msg" => "Señor te pido por mi familia, por mis amigos y por mí, que nos protejas y nos ayudes. Que me des salud para lograr todos mis metas y que me vaya bien en el trabajo.", "foto" => $plugin_uri . "postal_007.jpg"],
        ["num" => "008", "nombre" => "Joucita Rosa Quispe Morales", "edad" => "", "msg" => "Padre a ud. le pido de todo corazón que siempre nos guíe a tener la paz y el amor a la familia y que siempre estemos iluminados por el buen camino, mi familia y el mundo.", "foto" => $plugin_uri . "postal_008.jpg"],
        ["num" => "009", "nombre" => "Lisset Carrasco", "edad" => "", "msg" => "Soy Abigail y soy seguidora de Jesús. Te pido ores por mi familia, mi vida y mi labor como médico. Un abrazo cálido desde Chiclayo.", "foto" => $plugin_uri . "postal_009.jpg"],
        ["num" => "010", "nombre" => "Vanessa Chávez Chira", "edad" => "", "msg" => "Muchas gracias por bendecir a esta ciudad y gracias por siempre tenernos en sus oraciones. Que Dios siempre derrame bendiciones a usted su vida. → Vanessa.", "foto" => $plugin_uri . "postal_010.jpg"],
        ["num" => "011", "nombre" => "Brunella Fuentes", "edad" => "", "msg" => "Tuve dicha de conocerlo y escucharlo en el Santuario junto a mi esposo. Bendice mi hogar, a mi familia y a las personas que amo. Que tu amor por Chiclayo siga bendiciendo esta ciudad.", "foto" => $plugin_uri . "postal_011.jpg"],
        ["num" => "012", "nombre" => "Marco Antonio", "edad" => "", "msg" => "Agradeciente por tu labor pastoral. Bendice nuestros hogares y a cada una de las familias necesitadas. Un abrazo fraternal. Tu amigo Marco A.", "foto" => $plugin_uri . "postal_012.jpg"],
        ["num" => "013", "nombre" => "Marco Torres", "edad" => "", "msg" => "Dios lo ilumine en todo momento. Gracias por tener en sus oraciones a nuestro Perú.", "foto" => $plugin_uri . "postal_013.jpg"],
        ["num" => "014", "nombre" => "Ruth Vega Ballona", "edad" => "", "msg" => "Dios lo cuide siempre y lo ilumine para que sea nuestro guía espiritual. Al Perú tenga presente en sus oraciones.", "foto" => $plugin_uri . "postal_014.jpg"],
        ["num" => "015", "nombre" => "Guillermo Sosa Llontop", "edad" => "", "msg" => "En Semana Santa 2021 le entregué con mucho amor su Pondencia 'Estatuilla La Espada del Espíritu'. Padre le deseo lo mejor del mundo.", "foto" => $plugin_uri . "postal_015.jpg"],
        ["num" => "016", "nombre" => "Janet Aldana Fernández", "edad" => "", "msg" => "Que Dios y la Virgen María sean siempre la guía en su Pontificado. Saludos desde la Capital de la Amistad, Chiclayo.", "foto" => $plugin_uri . "postal_016.jpg"],
        ["num" => "017", "nombre" => "Ana Karen Rinza Reyes", "edad" => "", "msg" => "Que Dios siempre guíe la paz y esperanza de la ciudad de Chiclayo. Que Dios Bendiga siempre.", "foto" => $plugin_uri . "postal_017.jpg"],
        ["num" => "018", "nombre" => "Andrea Arévalo", "edad" => "", "msg" => "Te queremos mucho y te esperamos, gracias a ti mi madre se pudo casar antes de que mi abuela falleciera, te amamos mucho.", "foto" => $plugin_uri . "postal_018.jpg"],
        ["num" => "019", "nombre" => "Hilda Inope Arteaga", "edad" => "", "msg" => "Recibe mi saludo y a la vez deseo que siempre estés bendecido e iluminado por el Espíritu Santo para que no te falte salud, sabiduría y amor.", "foto" => $plugin_uri . "postal_019.jpg"],
        ["num" => "020", "nombre" => "Diana Limo Inope", "edad" => "", "msg" => "Un cariñoso saludo para ti deseando que Dios bendiga tu labor pastoral. Te quiero mucho y estamos orgullosos de que seas Chiclayano.", "foto" => $plugin_uri . "postal_020.jpg"],
        ["num" => "021", "nombre" => "Marisol Eca Puescas", "edad" => "", "msg" => "Un abrazo y cariño infinito para ti mi Robert. Desde Santa Rosa 'caleta'. Que Dios siempre te cuide y reza mucho por mí, mi salud y la unión de mi familia. Feliz de tenerte en Roma.", "foto" => $plugin_uri . "postal_021.jpg"]
    ];
}

/**
 * 2. Inyectar datos globales de WordPress en el front-end de forma global y segura
 */
add_action( 'wp_head', 'cp_inject_global_data_to_head', 1 );
function cp_inject_global_data_to_head() {
    $db_data = cp_get_default_postales_data();
    echo '<script id="chiclayo-postales-data-head">
    window.wordpressPostalesData = ' . json_encode( $db_data ) . ';
    window.chiclayoThemeUrl = "' . esc_url( plugins_url( '', __FILE__ ) ) . '";
    </script>' . "\n";
}

add_shortcode( 'chiclayo_postales', 'cp_render_postales_shortcode' );
function cp_render_postales_shortcode() {
    $plugin_dir_path = plugin_dir_path( __FILE__ );
    $assets_path = $plugin_dir_path . 'dist/assets/';
    
    $js_file = 'index.js';
    $css_file = 'index.css';

    // Si por alguna razón no existieran estáticos fijos, buscamos dinámicamente
    if ( ! file_exists( $assets_path . $js_file ) || ! file_exists( $assets_path . $css_file ) ) {
        if ( is_dir( $assets_path ) ) {
            $files = scandir( $assets_path );
            $temp_js = '';
            $temp_css = '';
            foreach ( $files as $file ) {
                if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'js' && strpos( $file, 'index' ) !== false ) {
                    $temp_js = $file;
                } elseif ( pathinfo( $file, PATHINFO_EXTENSION ) === 'css' && strpos( $file, 'index' ) !== false ) {
                    $temp_css = $file;
                }
            }
            if ( ! empty( $temp_js ) ) { $js_file = $temp_js; }
            if ( ! empty( $temp_css ) ) { $css_file = $temp_css; }
        }
    }

    $js_url = plugins_url( 'dist/assets/' . $js_file, __FILE__ );
    $css_url = plugins_url( 'dist/assets/' . $css_file, __FILE__ );

    ob_start();
    ?>
    <!-- Inyectar estilos CSS directamente en la página del Shortcode para evitar retardos -->
    <link rel="stylesheet" id="chiclayo-react-css-direct" href="<?php echo esc_url( $css_url ); ?>" type="text/css" media="all" />

    <!-- Contenedor principal de la app React -->
    <div id="root" class="chiclayo-app-wrapper"></div>
    
    <!-- Script en formato ES Module cargado directamente para inmunidad contra optimizadores/minificadores de WordPress -->
    <script type="module" id="chiclayo-react-js-direct" src="<?php echo esc_url( $js_url ); ?>"></script>

    <style>
        .chiclayo-app-wrapper {
            width: 100%;
            margin: 0 auto;
            font-family: inherit;
        }
    </style>
    <?php
    return ob_get_clean();
}
