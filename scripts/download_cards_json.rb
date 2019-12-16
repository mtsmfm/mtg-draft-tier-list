require 'net/http'
require 'json'

base_uri = 'https://api.magicthegathering.io/v1/cards?set=eld'

cards = 5.times.flat_map do |i|
  JSON.parse(Net::HTTP.get(URI(base_uri + "&page=#{i + 1}")))['cards']
end

File.write(File.join(__dir__, '../data/eld/cards.json'), cards.to_json)
