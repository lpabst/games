select * from pirateshighscores
where difficulty ilike 'hard'
order by score desc 
limit 10