### Leetcode 1892 (Hard): Page Recommendations II [Practice](https://leetcode.com/problems/page-recommendations-ii)

### Description  
You are given user friendships and a log of page "likes" by users. For every user, recommend pages that the user hasn't liked, but at least one of their **friends** has. For every such recommendation, return the user, the recommended page, and how many of that user's friends like that page. The result should include all possible recommendations for all users.

### Examples  

**Example 1:**  
Input:  
Friendship table:  
| user1_id | user2_id |
|----------|----------|
|    1     |    2     |
|    1     |    3     |
|    1     |    4     |
|    1     |    6     |

Likes table:  
| user_id | page_id |
|---------|---------|
|   2     |   23    |
|   2     |   77    |
|   2     |   56    |
|   3     |   24    |
|   3     |   23    |
|   3     |   56    |
|   3     |   77    |
|   1     |   88    |
|   6     |   33    |
|   4     |   88    |
|   4     |   77    |
|   4     |   23    |
|   5     |   77    |
|   5     |   23    |

Output:  
| user_id | page_id | friends_likes |
|---------|---------|---------------|
|    1    |   23    |      2        |
|    1    |   24    |      1        |
|    1    |   33    |      1        |
|    1    |   56    |      1        |
|    1    |   77    |      2        |

*Explanation: User 1's friends are 2,3,4,6.  
- Page 23 liked by 2 (friend), 3 (friend), and 4 (friend), but not by 1.  
- Page 24 liked by 3 only, not by 1.  
- Page 33 liked by 6, not by 1.  
- Page 56 liked by 3, not by 1.  
- Page 77 liked by 2, 3, and 4, but not by 1.  
Page 88 is not recommended, since 1 already liked it.*

**Example 2:**  
Input:  
User 6’s only friend is user 1; user 1 liked only page 88; user 6 also liked page 88.

Output:  
(no rows for user 6)

*Explanation: User 6’s only friend liked page 88, but user 6 already liked 88, so nothing to recommend.*

**Example 3:**  
Input:  
User 2's friends and likes:  
| user_id | page_id |
|---------|---------|
|   3     |   56    |
|   3     |   23    |

User 2 already likes pages 23, 56, etc.

Output:  
(recommend rows only for pages that at least one friend likes AND user 2 doesn't)


### Thought Process (as if you’re the interviewee)  
First, I’d focus on building the friendship network in both directions (since friendships are bidirectional).

Brute force: For each user:
- Find all their friends.
- For each friend, get all their liked pages.
- For each such page, if the user hasn’t already liked it, count how many friends like it (but NOT the user themself).

This maps naturally to SQL with joins.

Optimized approach:
- Create a user–friend mapping using UNION for both user1–user2 and user2–user1.
- Join this with the likes table, to see what pages the friends like.
- Exclude pages already liked by the user.
- Group by (user, page) to count how many friends like each page.

Trade-offs:  
- It can be expensive if there are many users/pages, but the logic is clear and relational operations handle the set logic well.

### Corner cases to consider  
- Users with no friends (no recommendations).
- Users whose friends haven't liked any pages.
- Users who already liked every page their friends liked.
- Friends with duplicate likes for the same page (should count as only one per friend).
- Self-recommendation should never occur.
- Empty Likes or Friendship tables.

### Solution

```python
# Simulate this in Python for interview purposes (but this would be much easier in SQL).
# We'll assume the input is given as:
# friendships: List of pairs (user1, user2)
# likes: List of pairs (user_id, page_id)

from collections import defaultdict

def page_recommendations(friendships, likes):
    # Build friendship mapping (bidirectional)
    friends = defaultdict(set)
    for u1, u2 in friendships:
        friends[u1].add(u2)
        friends[u2].add(u1)

    # Build like mapping
    user_likes = defaultdict(set)
    for uid, pid in likes:
        user_likes[uid].add(pid)

    recommendations = []
    all_users = set(friends.keys()) | set(user_likes.keys())
    for user in all_users:
        pages_recommended = defaultdict(int)
        for f in friends[user]:
            for page in user_likes[f]:
                # Recommend if user hasn't already liked page
                if page not in user_likes[user]:
                    pages_recommended[page] += 1
        for page, count in pages_recommended.items():
            recommendations.append((user, page, count))
    return recommendations

# Example usage:
# friendships = [(1,2), (1,3), (1,4), (1,6)]
# likes = [(2,23), (2,77), (2,56), (3,24), (3,23), (3,56), (3,77), (1,88), (6,33), (4,88), (4,77), (4,23), (5,77), (5,23)]
# print(page_recommendations(friendships, likes))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(F × L), where F is the number of friendship pairs and L is average number of likes per friend. In the worst case, if every user is friends with everyone and likes every page, this can approach O(U² × P), with U = users, P = pages.
- **Space Complexity:** O(U × P) to store all users' likes, plus O(U × F) for the friendships.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle duplicate recommendations?  
  *Hint: Only count the number of unique friends who like a given page per user.*

- Can you optimize for very large data (millions of users)?  
  *Hint: Consider index structures, streaming, and batching to limit memory usage.*

- What if you were asked to show only the top N recommendations for each user?  
  *Hint: Maintain only the N highest counts per user when aggregating.*

### Summary  
This problem is a classic **relational join/group-by** pattern, simulating recommendations by set operations over friends and page likes.  
The coding technique draws from database-style grouping (often implemented in interviews using Python dictionaries).  
This pattern is often used in "collaborative filtering" for recommendations, social networks (mutual friends, friend-of-friend), and many graph-based suggestion tasks.

### Tags
Database(#database)

### Similar Problems
- Page Recommendations(page-recommendations) (Medium)
- Strong Friendship(strong-friendship) (Medium)