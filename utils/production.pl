#!/usr/bin/perl

use strict;
use IO::File;
use JSON::PP;
use Data::Dumper;

my $production_filename = $ARGV[0] || die;
my $trade_filename = $ARGV[1] || die;
my $population_filename = $ARGV[2] || die;
my $output_filename = $ARGV[3] || die;

my $production_file = IO::File->new( $production_filename, 'r');

my %data_hash = ();

while (<$production_file>) {
  chomp;
  my $line = $_;
  if (!($line =~ m/^"QC"/)) {
    next;
  }

  $line =~ s/, //g;

  my @data_array = split /,/, $line;
  my $country = quote_str($data_array[3]);
  my $year = quote_str($data_array[8]);
  if (int($year) == 0 ) {
    next;
  }
  my $value = quote_str($data_array[9]);
  $data_hash{$year}{$country} = {'Production' => $value};
}
$production_file->close;

my $trade_file = IO::File->new( $trade_filename, 'r');
while (<$trade_file>) {
  chomp;
  my $line = $_;
  if (!($line =~ m/^"TP"/)) {
    next;
  }

  my @data_array = split /,/, $line;
  my $country = quote_str($data_array[3]);
  my $kind = quote_str($data_array[5]);
  my $year = quote_str($data_array[8]);
  if (int($year) == 0 ) {
    next;
  }

  my $value = quote_str($data_array[9]);

  if ($kind eq q/Import Quantity/) {
    $data_hash{$year}{$country}{'Import'} = $value;
  } elsif ($kind eq q/Export Quantity/) {
    $data_hash{$year}{$country}{'Export'} = $value;
  }
}
$trade_file->close;

my $population_file = IO::File->new( $population_filename, 'r');
while (<$population_file>) {
  chomp;
  my $line = $_;
  if (!($line =~ m/^"OA"/)) {
    next;
  }

  my @data_array = split /,/, $line;
  my $country = quote_str($data_array[3]);
  my $year = quote_str($data_array[8]);
  if (int($year) == 0 ) {
    next;
  }

  my $value = quote_str($data_array[9]);

  $data_hash{$year}{$country}{'Population'} = $value;
}
$population_file->close;

# print '"Country","Production","Import","Export","Population","Rank"';
# print "\n";

for my $year (keys %data_hash) {
  for my $country (keys $data_hash{$year}) {
    my $country_data = $data_hash{$year}{$country};
    my $current_data = $data_hash{'2011'}{$country};

    if (!exists $country_data->{'Population'} || $country_data->{'Population'} == 0) {
      delete $data_hash{$year}{$country};
      next;
    }

    if (!exists $country_data->{'Production'}) {
      if ($year > 2011) {
        $country_data->{'Production'} = $current_data->{'Production'};
      } else {
        $country_data->{'Production'} = 0;
      }
    }

    if (!exists $country_data->{'Import'}) {
      if ($year > 2011) {
        $country_data->{'Import'} = $current_data->{'Import'};
      } else {
        $country_data->{'Import'} = 0;
      }
    }

    if (!exists $country_data->{'Export'}) {
      if ($year > 2011) {
        $country_data->{'Export'} = $current_data->{'Export'};
      } else {
        $country_data->{'Export'} = 0;
      }
    }

    if ($country_data->{'Production'} == 0 && $country_data->{'Import'} == 0) {
      delete $data_hash{$year}{$country};
      next;
    }

    my $rank_data = ($country_data->{'Production'} + $country_data->{'Import'} - $country_data->{'Export'}) / $country_data->{'Population'};
    $country_data->{'ProdPerPerson'} = $rank_data;
    my $rank = 0;
    if ($rank_data < 20) {
      $rank = 1;
    } elsif ($rank_data < 40) {
      $rank = 2;
    } elsif ($rank_data < 250) {
      $rank = 3;
    } elsif ($rank_data < 350) {
      $rank = 4;
    } else {
      $rank = 5;
    }
    $country_data->{'Rank'} = $rank;

    if ($year == 2011) {
      print "\"$country\",";
      print $country_data->{'Production'}, ',';
      print $country_data->{'Import'}, ',';
      print $country_data->{'Export'}, ',';
      print $country_data->{'Population'}, ',';
      print $rank_data, ',';
      print $rank, "\n";
    }
  }
}


my $json_data = JSON::PP->new()->encode(\%data_hash);
my $output_file = IO::File->new($output_filename, 'w');

print $output_file $json_data;

$output_file->close;

print "\n";

sub quote_str {
  my $str = shift @_;
  return substr($str, 1, length($str) - 2);
}