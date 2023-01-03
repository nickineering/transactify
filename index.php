<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <title>Expensify Take-Home Challenge</title>
        <link rel="stylesheet" type="text/css" href="/frontend/static/styles.css" />
        <link rel="icon" href="/frontend/static/icon.svg" type="image/svg+xml" />
    </head>

    <body>
        <div id="page"></div>
        <div id="modal" class="modal-background">
            <div class="modal-foreground">
                <span class="close">&times;</span>
                <div id="modal-insert"></div>
            </div>
        </div>
        <script>
            window.statusCode = <?php echo json_encode($_SERVER['REDIRECT_STATUS']); ?>;
        </script>
        <script type="module" src="/frontend/static/js/index.js"></script>
    </body>

</html>