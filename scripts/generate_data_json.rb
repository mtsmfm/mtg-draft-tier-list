require 'json'

cards = JSON.parse(File.read(File.join(__dir__, '../data/eld/cards.json')))
tier = JSON.parse(File.read(File.join(__dir__, '../data/eld/tier.json')))

data = tier.map {|t|
  card = cards.find {|c| c['name'].tr(' ', '_') == t['name'] && c['multiverseid'] }
  ja = card['foreignNames'].find {|n| n['language'] == 'Japanese' }

  {
    name: ja ? ja['name'] : card['name'],
    imageUrl: ja ? ja['imageUrl'] : "https://mtg-jp.com//img_sys/cardImages/ELD/#{card['multiverseid'] + 1345}/cardimage.png",
    tier: t['myrating'].to_f,
    colors: card['colors']
  }
}

File.write(File.join(__dir__, '../data/eld.json'), data.to_json)
