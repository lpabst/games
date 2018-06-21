delete from minesweeperhighscores
where score < (
    select score from minesweeperhighscores
    order by score desc
    limit 1
    offset $1
)