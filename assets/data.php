<?php


$data = $_POST;
$action = $data["action"];
call_user_func($action,$data);
define("debug" ,true);
    error_reporting(E_ALL);
    ini_set('display_errors', 1);


function gallery(){

$galleries = array(
"foschini" => array()
,"truworths"=>array()
,"woolworths"=>array()
,"dischem"=>array()
,"edgards"=>array()
,"redsquare"=>array()
,"mac"=>array()
,"dion"=>array()
,"events"=>array()
,"shelf"=>array()
,"centercourts"=>array()
,"btgames"=>array()
);

foreach($galleries AS $key => $value){
    $directory = "/var/www/html/assets/images/gallery/".$key;
    $images = glob($directory . "/*.{jpg,jpeg,png,gif,mp4,ogg}", GLOB_BRACE);
    foreach($images AS $image){
        $img = str_replace('/var/www/html/','',$image);
        $galleries[$key][] = $img;
    }   
}


 echo json_encode($galleries);
}


function slides(){
    $slides = array();
    $slides[] = array(
        'prev'=>'Dion Wired',
        'next'=>'MAC Cosmetics',
        'comp_title'=>'Bacher &amp; Co <br/> MAC COSMETICS',
        'paragraph'=>'&ldquo;Your team as always carried out an excellent job from start to finish.&rdquo;',
        'person'=>'Barbara van Kraayenburg',
        'person_info'=>'Marketing &amp; Social Media<br/> Fragrances &amp; Cosmetics',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/MB014-LADY-EMBLEM-ELIXIR-RANGE_small.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/Bacher-Logo.jpg'
    );
    $slides[] = array(
        'prev'=>'Bacher &amp; Co',
        'next'=>'L&rsquo;ORÉAL LUXE',
        'comp_title'=>'Estee Lauder<br/>MAC COSMETICS',
        'paragraph'=>'&ldquo;The team has been ever so willing to assist us and is very capable of managing our campaigns.&rdquo;',
        'person'=>'Ronald Naidoo',
        'person_info'=>'National Marketing Manager',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/spring2017_maccolourrocker002.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/MAC-Cosmetics-vector-logo.jpg'
    );
    $slides[] = array(
        'prev'=>'MAC Cosmetics',
        'next'=>'The Prestige<br/> Cosmetics Group',
        'comp_title'=>'L&rsquo;Oréal Luxe',
        'paragraph'=>'&ldquo;We love working with the Grapevine Team.&rdquo;',
        'person'=>'Tammy Maher',
        'person_info'=>'L&rsquo;Oréal Luxe',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/YSL-Black-Opium-EDP.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/Loreal-Luxe-Logo.jpg'
    );
    $slides[] = array(
        'prev'=>'L&rsquo;Oréal Luxe',
        'next'=>'Bacher &amp; Co',
        'comp_title'=>'The Prestige<br/> Cosmetics Group',
        'paragraph'=>'&ldquo;Grapevine is the Google of In-store Branding&rdquo;.',
        'person'=>'The Prestige Cosmetics Group',
        'person_info'=>'',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/07/The-Prestige-Cosmetics-Group-Product-Bottles.png',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/07/PCG-Logo.png'
    );
    $slides[] = array(
        'prev'=>'The Prestige Cosmetics Group',
        'next'=>'L&rsquo;ORÉAL LUXE',
        'comp_title'=>'Bacher &amp; Co',
        'paragraph'=>'&ldquo;The whole team is an absolute pleasure to work with – makes our deadlines less stressful.&rdquo;',
        'person'=>'Dalene Blackman.',
        'person_info'=>'Retail Marketing<br/>Fragrance &amp; Cosmetics',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/MB014A01-LADY-EMBLEM-ELIXIR-75ml_small.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/Bacher-Logo.jpg'
    );
    $slides[] = array(
        'prev'=>'Bacher &amp; Co',
        'next'=>'Woolworths',
        'comp_title'=>'L&rsquo;Oréal Luxe',
        'paragraph'=>'&ldquo;The Grapevine team has been fantastic!"<br/>"Beautiful Work! Very impactful and great quality"<br/>&ldquo;The Code Profumo campaign was a huge success and the elements produced were of superior quality.&rdquo;',
        'person'=>'Jane van Blommenstein',
        'person_info'=>'Senior Product Manager: Designer Fragrances',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/2015_ACH_PROFUMO_PACKSHOT.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/Loreal-Luxe-Logo.jpg'
    );
    $slides[] = array(
        'prev'=>'L&rsquo;Oréal Luxe',
        'next'=>'L&rsquo;Oréal Luxe',
        'comp_title'=>'Woolworths',
        'paragraph'=>'&ldquo;Elie Saab Woolworths Cat A Drive Aisle and Outposts saw an increase of 50% in Sales within the week the campaign took place.&rdquo;',
        'person'=>'Shayne Fraser-Bierman',
        'person_info'=>'Brand Manager - Branded Fragrances and Body Brands',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/Elie-Saab-Flacon_Le_Parfum_RC.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/06/Woolworths_logotype_2.png'
    );
    $slides[] = array(
        'prev'=>'Woolworths',
        'next'=>'Clinique',
        'comp_title'=>'L&rsquo;Oréal Luxe',
        'paragraph'=>'&ldquo;Kouros Dis-Chem Windows Sales increased from 1 to 8 units per day during the time the campaign visuals were up.&rdquo;',
        'person'=>'Kim Parrot',
        'person_info'=>'Group Product Manager',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/120629.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/Loreal-Luxe-Logo.jpg'
    );
    $slides[] = array(
        'prev'=>'L&rsquo;Oréal Luxe',
        'next'=>'DKNY',
        'comp_title'=>'Clinique',
        'paragraph'=>'&ldquo;Everything looked amazing and the execution was fabulous&rdquo;',
        'person'=>'Jessica de Klerk',
        'person_info'=>'Clinique Product Manager Makeup, Fragrance, Promo and GWP',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/clinique-gwp.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/Clinique_logo_logotype.jpg'
    );
    $slides[] = array(
        'prev'=>'Clinique',
        'next'=>'Dion Wired',
        'comp_title'=>'Estee Lauder<br/>DKNY',
        'paragraph'=>'&ldquo;Grapevine exceeded our expectations and pulled this job together in an amazing fashion. This has definitely created the disruption we wanted and what the brand needed&rdquo;',
        'person'=>'Neli Thabethe',
        'person_info'=>'',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/o.18939.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/estee-lauder-.eps-logo-vector-e1497880206375.jpg'
    );
    $slides[] = array(
        'prev'=>'DKNY',
        'next'=>'Bacher &amp; Co',
        'comp_title'=>'Dion Wired',
        'paragraph'=>'&ldquo;Good feedback on the PS4 Horizon Zero Windows. Well done, sell out of the PS4 Horizon Zero is already at 70% (within the first week of the campaign)&rdquo;',
        'person'=>'Ahmed Gangat',
        'person_info'=>'Marketing Manager',
        'product_img'=>'https://grapevine.co.za/wp-content/uploads/2017/05/LOCKUP_PS4HZD_packshot.jpg',
        'company_logo'=>'https://grapevine.co.za/wp-content/uploads/2017/05/logo.jpg'
    );
    echo json_encode($slides);
}

function sendMail($data){
    $to = "info@grapevine.co.za";
    //$to = "strauss@bornintelligence.com";
        $p_style = '<p style="font-family: \'Lato\';font-size: 14px;line-height: 1.4em;font-weight: normal;">';
        $h2_style = '<h2 style="margin: 0px 0px 10px 0px;text-align: left;font-family: \'Lato\', \'Open Sans\';font-weight: 100;font-size: 24px;">';
        $button_style = 'style="display: inline-block;padding: 10px;margin: 0px;border: 1px solid #999;text-decoration: none;background: #999;color: #FFF;font-weight: bold;cursor: pointer;box-shadow: 2px 2px 6px -1px #808080;border-radius: 4px;-webkit-transition: all 0.3s;-moz-transition: all 0.3s;-ms-transition: all 0.3s;-o-transition: all 0.3s;transition: all 0.3s"';
        $message_header = '<html lang="en">';
        $message_header .='<head>';
        $message_header .= '<style>';
        $message_header .= '@import url(https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,500,500italic,700italic,700,900,900italic);';
        $message_header .= '* {font-family: \'Lato\', sans-serif; color:black;}';
        $message_header .= 'a:hover {background-color: #3c3c3c;border: 1px solid #3c3c3c;}';
        $message_header .= '</style>';
        $message_header .= '</head>';
        $message_header .= '<body style="background: transparent;height: 100%; width: 100%;display: block;margin: 0px;">';
        $message_header .= '<div style="width: 100%; height: 70px;">';
        $message_header .= '<a href="https://grapevine.co.za" style="margin: 18px auto;height: 50px;display: inline-block;">';
        $message_header .= '<img src="https://grapevine.co.za/assets/images/gv_full_logo.png" style="height:50px; margin-left:20px;">';
        $message_header .= '</a>';
        $message_header .= '</div>';
        $message_header .= '<div style="margin:25px auto;padding:30px;background:#fff;max-width: 75%;">';
        $raw_message = "<h2>Good day</h2>";
        $raw_message .= "<p>The following contact request has been recieved via the website";
        $raw_message .= '<table>';
        foreach($data AS $key=> $value){
            if($key != 'action')    
            $raw_message .= "<tr><td>".$key.'</td><td>'.$value.'</td></tr>';
        }
        $raw_message .= "</table>";
        $message_footer = '</div>';
        $message_footer .= '</body></html>';

        $message = str_replace("<h2>",$h2_style ,$raw_message);
        $message = str_replace("<p>",$p_style ,$message);
        $message = str_replace("class=\"button\"",$button_style ,$message);
        $message = str_replace("class='button'",$button_style ,$message);


        $headers  = array('MIME-Version'=> '1.0');
        $headers['Content-type'] ='text/html; charset=iso-8859-1';

        $html_message = $message_header.$message.$message_footer ;
// Additional headers
        $to_string = "";
        $mail_string = "";

        $headers['to'] = $to;

            $headers['from'] = 'Grapevine Media<info@grapevine.co.za>';
            $subject = 'Website Enquiry';
            dbMail($html_message,$data);
            $result = pearMail($to,$subject,$html_message);
            $a = ['code'=>$result];
            echo json_encode($a);
        
}


function dbMail($message,$fields){

    $db = 'grapevine';
    $serv = 'localhost';
        $user = 'grapevine';
        $pass = 'JA5kHMcgVv6BIh13';

    $conn = mysqli_connect($serv,$user,$pass,$db);
    if (mysqli_connect_errno())
        {
            $err = "Failed to connect to MySQL: " . mysqli_connect_error();
            echo $err;
        }
        else
        {
            $sql = "INSERT INTO `mails`( `message`, `fields`) VALUES ('".addslashes($message)."','".addslashes(print_r($fields,true))."')";
            $conn->query($sql);

        }
        $conn->close();

}



    function pearMail( $to, $subject, $message)
    {
        require_once 'Mail.php';
        $recipients = $to;

        $headers['From'] = 'grapevine.media.intel@gmail.com';
        $headers['To'] = $to;
        $headers['Subject'] = $subject;
        $headers['Content-type'] = 'text/html;charset=iso-8859-1';
        $body = $message;

//    foreach($header AS $k => $h){
//        $headers[$k] = $h;
//    }

        $params['host'] = 'smtp.gmail.com';
        $params['port'] = 587;
        $params['debug'] = false;
        $params['username'] = 'grapevine.media.intel@gmail.com';
        $params['password'] = '!NT3ll!G3nc3';
        $params["auth"] = "PLAIN";

         $mailer = Mail::factory('smtp', $params);
         try {
          $mail =  $mailer->send($to, $headers, $body); 
       } catch (Exception $e) {
             $err = $e->getMessage();

             if (preg_match('/Name or service not known/i', $err)) {
                 return 'code:42';
             } else {

                 if (preg_match('/DEBUG: Recv: 250 2.0.0 OK/i', $err)) {
                     return 'code:42';
                     }
                     else
                     {
                         return "code:00";
                     }
             }

     }

        return 'code:42';
     }
