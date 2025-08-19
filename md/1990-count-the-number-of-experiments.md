### Leetcode 1990 (Medium): Count the Number of Experiments [Practice](https://leetcode.com/problems/count-the-number-of-experiments)

### Description  
Given a table `Experiments` with columns:  
- `experiment_id` (unique id for each experiment),  
- `platform` (can be 'Android', 'IOS', or 'Web'),  
- `experiment_name` (can be 'Reading', 'Sports', or 'Programming'),  
count the number of experiments completed for every combination of platform and experiment name.  
If a combination has no experiments, its count should be `0`.  
Return a table with columns: `platform`, `experiment_name`, `num_experiments`.  
(Think of it as a report showing all possible platform and experiment name pairs and the number of times each was conducted.)

### Examples  

**Example 1:**  
Input:  
`Experiments` table:  
| experiment_id | platform | experiment_name |
|---------------|----------|----------------|
| 1             | Android  | Reading        |
| 2             | IOS      | Sports         |

Output:  
| platform | experiment_name | num_experiments |
|----------|----------------|-----------------|
| Android  | Reading        | 1               |
| Android  | Sports         | 0               |
| Android  | Programming    | 0               |
| IOS      | Reading        | 0               |
| IOS      | Sports         | 1               |
| IOS      | Programming    | 0               |
| Web      | Reading        | 0               |
| Web      | Sports         | 0               |
| Web      | Programming    | 0               |

*Explanation:  
Every possible platform–experiment pair is shown, with 1 or 0 as the count depending on whether it appeared in the input.*

**Example 2:**  
Input:  
No rows in the `Experiments` table.

Output:  
All 9 combinations (Android, IOS, Web × Reading, Sports, Programming) with `num_experiments = 0`.

*Explanation:  
Every possible combination is listed with 0 since there were no experiments conducted.*

**Example 3:**  
Input:  
`Experiments` table:  
| experiment_id | platform | experiment_name |
|---------------|----------|----------------|
| 1             | Web      | Programming    |
| 2             | Web      | Programming    |
| 3             | Android  | Sports         |

Output:  
| platform | experiment_name | num_experiments |
|----------|----------------|-----------------|
| Android  | Reading        | 0               |
| Android  | Sports         | 1               |
| Android  | Programming    | 0               |
| IOS      | Reading        | 0               |
| IOS      | Sports         | 0               |
| IOS      | Programming    | 0               |
| Web      | Reading        | 0               |
| Web      | Sports         | 0               |
| Web      | Programming    | 2               |

*Explanation:  
Web–Programming gets 2, Android–Sports gets 1, others get 0.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would be to list all combinations (3 platforms × 3 experiments = 9) and count how many records exist for each in the table.
- Since some combinations may not exist in the table, we need to make sure to include those with a zero count.
- To generate all combinations regardless of data presence, use a cross join of all platforms and experiment names.
- Then, left join this set to the actual `Experiments` data by `platform` and `experiment_name`.
- Finally, group by platform and experiment_name, counting experiment_id, replacing NULL with 0 as needed (using COALESCE).
- This follows a standard SQL reporting/grouping pattern.
- The main challenge is ensuring all combinations appear (even when missing from data).

### Corner cases to consider  
- The `Experiments` table is empty (should return all combinations with zero).
- Some platform–experiment pairs have more than one record.
- No experiments for a specific platform or experiment_name.
- Table includes all combinations at least once.
- Table includes only one experiment (for any combination).

### Solution

```sql
-- Generate all platform–experiment_name pairs using CROSS JOIN
WITH Platforms AS (
  SELECT 'Android' AS platform
  UNION ALL
  SELECT 'IOS'
  UNION ALL
  SELECT 'Web'
),
ExperimentNames AS (
  SELECT 'Reading' AS experiment_name
  UNION ALL
  SELECT 'Sports'
  UNION ALL
  SELECT 'Programming'
)
SELECT
  p.platform,
  e.experiment_name,
  COALESCE(COUNT(exp.experiment_id), 0) AS num_experiments
FROM Platforms p
CROSS JOIN ExperimentNames e
LEFT JOIN Experiments exp
  ON exp.platform = p.platform AND exp.experiment_name = e.experiment_name
GROUP BY p.platform, e.experiment_name
ORDER BY p.platform, e.experiment_name;
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Listing all combinations (constant: 3 platforms × 3 experiments = 9).  
  The join and group by both scale with the input size N: O(N).
  Overall, O(N).

- **Space Complexity:**  
  The output is always 9 rows.  
  Temporary CTEs add negligible space.
  So, O(1) extra space (not counting database storage).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a dynamic set of platforms and experiment names (not hardcoded)?
  *Hint: Use SELECT DISTINCT from the data for platform and experiment_name lists.*

- How could the logic change if platforms and experiment names come from separate reference tables instead of hardcoded values?
  *Hint: Replace CTEs with reference table joins.*

- What if you need the percentage of experiments for each pair, relative to the platform total?
  *Hint: Compute sums partitioned by platform and join back for ratio.*

### Summary
This problem uses a common **reporting pattern** in SQL: listing all possible category combinations, grouping, and counting occurrences, ensuring even zero-count cases with CROSS/LEFT JOINs and COALESCE. It’s a frequently used technique for creating completeness in summary or dashboard reports. This pattern also applies to survey analysis, completeness checks, and business intelligence tasks where "all combinations" must be displayed.

### Tags
Database(#database)

### Similar Problems
