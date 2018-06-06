delete from pirateshighscores
where difficulty = $1
and score < (
    select score from pirateshighscores
    where difficulty = $1
    order by score desc
    limit 1
    offset $2
)