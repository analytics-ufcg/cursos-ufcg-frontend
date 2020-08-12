<?php
  $REP = '/home/preanalytics/pre-analytics';
  $KEY = '/home/preanalytics/deploy_keys/id_rsa';

  $signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];
  $dump = file_get_contents('php://input');
  $payload = json_decode($dump, true);

  $cmd = "git --work-tree=$REP --git-dir=$REP/.git pull";

  if($_SERVER['HTTP_X_GITHUB_EVENT'] !== 'pull_request')
    die('Request ignored');

  if('sha1=' . hash_hmac('sha1', $dump, 'pr3d3pl0y') === $signature)
    if($payload['action'] === 'closed')
      echo shell_exec("ssh-agent bash -c 'ssh-add $KEY; $cmd'");
?>
