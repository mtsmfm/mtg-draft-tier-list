require 'net/http'
require 'json'

data = Net::HTTP.get(URI('https://draftsim.com/generated/ELD.js'))

File.write(File.join(__dir__, '../data/eld/tier.json'), data.scan(/\[.*\]/).first.gsub(/(\w+):/, '"\1":').sub(/,\]$/, ']'))
