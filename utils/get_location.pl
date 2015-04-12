#!/usr/bin/perl

use strict;
use LWP::Simple;
use JSON::PP;
use Math::Trig qw/:pi acos/;
use Data::Dumper;

our $base_url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=';
our $json_obj = JSON::PP->new();

my $large_country_filename = $ARGV[0] || die;

my $large_country_file = IO::File->new( $large_country_filename, 'r');
my @large_country_list = ();
while (<$large_country_file>) {
  chomp;
  push @large_country_list, $_;
}

my @country_list = ();
my %country_data_hash = ();
while (<STDIN>) {
  chomp;
  my $country = $_;
  push @country_list, $country;
  my $country_data = get_country_data($country);
  $country_data_hash{$country} = $country_data;
}

my @country_data_list = ();
for my $country (@country_list) {
  my @distance_list = ();
  for my $large_country (@large_country_list) {
    my %distance_hash = ();
    my $distance = 0;

    if ($country ne $large_country) {
      $distance = get_distanece($country_data_hash{$country}, $country_data_hash{$large_country});
    }

    $distance_hash{'country'} = $large_country;
    $distance_hash{'distance'} = $distance;
    push @distance_list, \%distance_hash;
  }
  $country_data_hash{$country}->{'distance_list'} = \@distance_list;
  push @country_data_list, $country_data_hash{$country};
}

print $json_obj->encode(\@country_data_list);
print "\n";

sub get_latlon {
  my $keyword = shift;
  my $url = $base_url . $keyword;
  my $response = get($url);
  my $ret_json = $json_obj->decode($response);
  return $ret_json->{'results'}->[0]->{'geometry'}->{'location'};
}

sub get_country_data {
  my $country = shift;
  my %data_hash = ('country' => $country);
  my $lat_lon = get_latlon($country);
  if (! defined $lat_lon) {
    return undef;
  }
  $data_hash{'lat'} = $lat_lon->{'lat'};
  $data_hash{'lon'} = $lat_lon->{'lng'};
  return \%data_hash;
}

sub get_distanece {
  my $data1 = shift;
  my $data2 = shift;

  if ($data1->{'lat'} == $data2->{'lat'} && $data1->{'lat'} == $data2->{'lon'}) {
    return 0;
  }

  my $r = 6378.137;

  my $converted_lat1 = $data1->{'lat'} * pi / 180.;
  my $converted_lon1 = $data1->{'lon'} * pi / 180.;
  my $converted_lat2 = $data2->{'lat'} * pi / 180.;
  my $converted_lon2 = $data2->{'lon'} * pi / 180.;

  my $distance = $r * acos(sin($converted_lat1) * sin($converted_lat2)
   + cos($converted_lat1) * cos($converted_lat2) * cos($converted_lon2 - $converted_lon1));
  if (abs($distance) < 1) {
    return 0;
  }
  return (abs($distance) >= 1) ? $distance : 0
}