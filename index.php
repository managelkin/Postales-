<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title( '|', true, 'right' ); ?><?php bloginfo( 'name' ); ?></title>
    <?php wp_head(); ?>
    
    <?php
    // Obtener y resolver el JS y CSS compilado de la build de Vite de manera directa y segura
    $assets_path = get_template_directory() . '/dist/assets/';
    $js_file = 'index.js';
    $css_file = 'index.css';

    if ( is_dir( $assets_path ) ) {
        $files = scandir( $assets_path );
        foreach ( $files as $file ) {
            if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'js' && strpos( $file, 'index' ) !== false ) {
                $js_file = $file;
            }
            if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'css' && strpos( $file, 'index' ) !== false ) {
                $css_file = $file;
            }
        }
    }
    $js_url = get_template_directory_uri() . '/dist/assets/' . $js_file;
    $css_url = get_template_directory_uri() . '/dist/assets/' . $css_file;
    ?>
    <link rel="stylesheet" id="chiclayo-react-css-direct" href="<?php echo esc_url( $css_url ); ?>" type="text/css" media="all" />

    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #FAF6F0;
        }
        /* Eliminar el margen molesto superior si el admin-bar está activo */
        html {
            margin-top: 0 !important;
        }
        @media screen and (max-width: 782px) {
            html {
                margin-top: 0 !important;
            }
        }
    </style>
</head>
<body <?php body_class(); ?>>

    <!-- Contenedor principal donde se monta la App de React automáticamente -->
    <div id="root"></div>

    <!-- Script en formato módulo cargado al final del body de manera directa para evitar filtros de optimizadores WP -->
    <script type="module" id="chiclayo-react-js-direct" src="<?php echo esc_url( $js_url ); ?>"></script>

    <?php wp_footer(); ?>
</body>
</html>
