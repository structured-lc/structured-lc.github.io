### Leetcode 1733 (Medium): Minimum Number of People to Teach [Practice](https://leetcode.com/problems/minimum-number-of-people-to-teach)

### Description  
Given a social network of users, each knowing a set of languages, and a list of friendships between users, the task is to determine the smallest number of users you need to teach a new language (of your choice) so that every pair of friends can communicate directly in at least one shared language. Teaching a user a new language expands their language set.

### Examples  

**Example 1:**  
Input:  
```
n = 2, 
languages = [[1],[2]], 
friendships = [[1,2]]
```
Output: `1`  
*Explanation:* User 1 knows language 1 only, user 2 knows language 2 only, and they are friends but cannot communicate. Teaching either user language 1 or 2 will allow the pair to communicate.

**Example 2:**  
Input:  
```
n = 3,
languages = [[1],[1,2],[3]],
friendships = [[1,2],[2,3],[3,1]]
```
Output: `2`  
*Explanation:*  
- Friendship [1,2]: Users 1 and 2 both know language 1.
- Friendship [2,3]: No common language, so users 2 and 3 can't communicate.
- Friendship [3,1]: No common language.
  
We need to teach users that can't communicate with at least one friend. Here, user 2 and user 3 can't talk in [2,3] and [3,1], so teach user 3 language 1 or 2 and user 1 or 2 teaches language 3. Minimum is 2 users.

**Example 3:**  
Input:  
```
n = 4,
languages = [[2],[2,3],[3,4],[4]],
friendships = [[1,2],[2,3],[3,4],[4,1]]
```
Output: `2`  
*Explanation:*  
- [1,2]: Users 1 and 2 share language 2.
- [2,3]: Users 2 and 3 share language 3.
- [3,4]: Users 3 and 4 share language 4.
- [4,1]: Users 4 and 1 do not share any language.

We need to teach user 1 or 4 a language that the other knows; teaching user 1 language 4 or user 4 language 2 suffices. But due to other connections, the minimum is 2 users.

### Thought Process (as if you’re the interviewee)  
Let's break down the problem:

1. For every friendship, check if they have a language in common.
2. For friendships where they can't communicate, add both users to a set "need to teach."
3. For each language, count how many users in "need to teach" already know it.
4. To minimize teaching, select a language that the maximum number of "need to teach" users already know. Then, only teach the remaining users that language.
5. Output the minimum of (size of "need to teach" - number of "need to teach" users already knowing best language).

**Brute-force:**  
Try teaching each language to each relevant user and see which yields the fewest total teachings.

**Optimized:**  
Since teaching the same language to everyone in need is always at least as good as any time you split which language is taught, we only need to consider each language as the "target." For each, compute how many new teachings would be needed.

**Trade-offs:**  
- This algorithm is efficient since it only inspects friendship pairs and user language membership.
- Main optimization: reduce number of users taught by leveraging common language preferences among those who need teaching.

### Corner cases to consider  
- No friendship pairs (minimum is 0).
- All users already share a common language with all friends (minimum is 0).
- Multiple disconnected users or self-friendships.
- Some users know every language.
- All languages are unique per user (worst case: must teach one in each friendship pair).

### Solution

```python
from collections import Counter

def minimumTeachings(n, languages, friendships):
    # Helper to check if two users share a language
    def can_communicate(u, v):
        return bool(set(languages[u-1]) & set(languages[v-1]))
    
    # Set of users who cannot communicate with at least one friend
    need_teach = set()
    for u, v in friendships:
        if not can_communicate(u, v):
            need_teach.add(u)
            need_teach.add(v)
    
    # For each language, count how many users in need_teach already know it
    language_counter = Counter()
    for user in need_teach:
        for lang in languages[user-1]:
            language_counter[lang] += 1
    
    # If need_teach is empty, return 0 (everyone can communicate)
    if not need_teach:
        return 0
    
    # Find the language known by most need_teach users
    max_shared = max(language_counter.values(), default=0)
    # Minimum to teach: need_teach users minus those who know the "best" language
    return len(need_teach) - max_shared
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(F × L), where F is number of friendships and L is the average number of languages per user. For each friendship, we compare language lists. For each relevant user, we go through their language list for counting.
- **Space Complexity:** O(U + L), where U is the number of users who need teaching and L is the number of possible languages. Space used for sets, counters, and per-user language membership.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we can teach multiple languages to the same user?
  *Hint: Consider how teaching multiple languages changes your state tracking and optimality.*

- What if each language has a cost, and your goal is to minimize total cost, not just number taught?
  *Hint: Weighted min cover or DP might be necessary.*

- How would you scale this if "friendships" is very large and doesn't fit in memory?
  *Hint: Streaming/batch processing; break friendships into chunks/transforms.*

### Summary
This problem is a strong example of **greedy covering**: select the language that maximizes overlap with the group in need, and quantify the minimum extra coverage required. Patterns similar to "minimum covering set," "set cover," or "minimum dominating set" frequently occur in resource allocation, network communication, and teaching/learning problems.