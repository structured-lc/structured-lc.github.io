### Leetcode 1811 (Medium): Find Interview Candidates [Practice](https://leetcode.com/problems/find-interview-candidates)

### Description  
Given two tables:

- **Contests**: Each row gives the contest id and user ids of gold, silver, and bronze medal winners.
- **Users**: Each row gives a user id, their email, and name.

Find all users who are "interview candidates", meaning:

- The user won **any medal** (gold, silver, or bronze) in **three or more consecutive contests**  
  OR  
- The user won the **gold medal** in **three or more different contests** (these do not have to be consecutive).

Return each qualifying user’s name and mail.  
Order does not matter.

### Examples  

**Example 1:**  
Input:
Contests:  
| contest_id | gold_medal | silver_medal | bronze_medal |
|------------|------------|--------------|--------------|
|     1      |     3      |      4       |      2       |
|     2      |     2      |      3       |      5       |
|     3      |     3      |      1       |      2       |
|     4      |     2      |      4       |      3       |

Users:  
| user_id | mail              | name   |
|---------|-------------------|--------|
|   1     | a@leetcode.com    | Alice  |
|   2     | b@leetcode.com    | Bob    |
|   3     | c@leetcode.com    | Chris  |
|   4     | d@leetcode.com    | Dave   |
|   5     | e@leetcode.com    | Ellen  |

Output:
| name  | mail            |
|-------|-----------------|
| Chris | c@leetcode.com  |
| Bob   | b@leetcode.com  |

*Explanation:*
- Chris (user 3) won a medal in contests 1,2,3,4 (contests 1,2,3 are consecutive medals), also has 3 golds (contests 1,2,3).
- Bob (user 2) won a medal in contests 1,2,3,4 (contests 2,3,4 are consecutive medals).

**Example 2:**  
Input:
Contests:  
| contest_id | gold_medal | silver_medal | bronze_medal |
|-----|-----|-----|-----|
|101  | 1   | 2   | 3   |
|102  | 3   | 1   | 2   |
|103  | 2   | 3   | 1   |

Users:  
| user_id | mail        | name |
|------|-----------|------|
| 1    | x@x.com   | X   |
| 2    | y@y.com   | Y   |
| 3    | z@z.com   | Z   |

Output:
| name | mail    |
|------|---------|
| X    | x@x.com |
| Y    | y@y.com |
| Z    | z@z.com |

*Explanation:*
- All users have a medal in each contest (contests are consecutive), so all satisfy the first condition.

**Example 3:**  
Input:
Contests:  
| contest_id | gold_medal | silver_medal | bronze_medal |
|-----|-----|-----|-----|
|10   | 1   | 2   | 3   |
|11   | 2   | 1   | 3   |
|12   | 3   | 1   | 2   |

Users:  
| user_id | mail        | name |
|------|-----------|------|
| 1    | alice@a.com | Alice |
| 2    | bob@b.com   | Bob   |
| 3    | carl@c.com  | Carl  |

Output:  
| name  | mail        |
|-------|------------|
| Alice | alice@a.com|
| Bob   | bob@b.com  |
| Carl  | carl@c.com |

*Explanation:*
- Each user won a medal in every contest; all have 3 medals in consecutive contests.

### Thought Process (as if you’re the interviewee)  
- **Step 1: Understand the conditions.**
  - First: Find users with a medal in three or more consecutive contests.
  - Second: Find users who won gold in at least three different contests.
- **Brute-force for consecutive medals:**
  - For each user, list all contests where they medaled and check for any sequence of 3 or more consecutive `contest_id`s.
  - For “gold in 3 contests,” count distinct contests where they were gold.
- **Optimization:**
  - Using SQL, map each medal winner (any color) to the contest.
  - For consecutive checking, sort contests for each user, then find segments where (contest_id - row_number) is constant, which groups all consecutive streaks.
  - For the golds, simple GROUP BY user, filter where count ≥ 3.
- **Trade-offs:**
  - The “group_id” trick (contest_id - row_num) makes consecutive sequence detection efficient without windowing.
  - SQL set logic (UNION) can catch unique candidates under either condition.

### Corner cases to consider  
- Users who win medals, but not in 3 consecutive contests or 3 golds.
- The same user can qualify through both conditions.
- If contest IDs skip numbers (shouldn’t per prompt), consecutive logic would break—ensure consecutive contest IDs.
- Users who never won any medal.
- Multiple users qualifying in the same contest.

### Solution

```python
# For illustration, here is a Python-like approach to the SQL idea.
# In interviews, express clearly how you map SQL window functions / group logic.

def find_interview_candidates(contests, users):
    # Build: contest_id -> [gold, silver, bronze] and user_id -> user record
    from collections import defaultdict

    user_contests = defaultdict(list)
    gold_counts = defaultdict(int)

    # Step 1: Map medalists to contests for any medal
    for c in contests:
        cid = c['contest_id']
        for uid in [c['gold_medal'], c['silver_medal'], c['bronze_medal']]:
            user_contests[uid].append(cid)
        gold_counts[c['gold_medal']] += 1

    result_ids = set()

    # Step 2: Check consecutive medals for each user
    for uid, cids in user_contests.items():
        cids = sorted(cids)
        streak = 1
        for i in range(1, len(cids)):
            if cids[i] == cids[i-1] + 1:
                streak += 1
                if streak >= 3:
                    result_ids.add(uid)
                    break
            else:
                streak = 1

    # Step 3: Check golds
    for uid, count in gold_counts.items():
        if count >= 3:
            result_ids.add(uid)

    # Step 4: Collect user details
    user_map = {u['user_id']: u for u in users}
    out = []
    for uid in result_ids:
        user = user_map.get(uid)
        if user:
            out.append({'name': user['name'], 'mail': user['mail']})

    return out
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(M log M + N), where M = total number of medal records (3 × no. contests), due to sorting contest ids per user.
  - Counting golds is O(K), K = number of contests.
  - Final filtering and result build is O(U), U = users.
- **Space Complexity:**  
  - O(M + U), for mapping user contest lists, gold counts, and result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want a parameter n, not just 3, for "n or more consecutive contests"?
  *Hint: Generalize the streak check to require n, pass as a variable.*

- Suppose we only care about consecutive contests the user actually participated in, not just all contest ids?
  *Hint: You’ll need another table tracking contest participation, and only look at their own participation ordering.*

- How would you handle very large datasets (say millions of contests/users)?
  *Hint: Consider SQL window functions, batching, or pre-aggregated summary tables.*

### Summary
This problem demonstrates **streak detection** and **grouped aggregation**—patterns common in competition analysis, daily activity streaks, and time-based achievements. The core trick is the contest_id − row_number window function grouping to catch consecutivity, and GROUP BY + HAVING for simple tallies. These ideas are broadly reusable across analytics and leaderboard problems.


### Flashcard
Find users with medals in 3+ consecutive contests (window function) OR gold medals in 3+ distinct contests; union both conditions.

### Tags
Database(#database)

### Similar Problems
