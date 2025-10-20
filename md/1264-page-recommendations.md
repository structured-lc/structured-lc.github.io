### Leetcode 1264 (Medium): Page Recommendations [Practice](https://leetcode.com/problems/page-recommendations)

### Description  
Given two tables – **Friendship** (bi-directional friendships between users) and **Likes** (which pages users have liked) – **recommend pages to a selected user** (typically user_id=1, but in practice this can be parameterized). The recommendations should include 
- pages liked by the user's friends
- but **exclude** any pages the user has already liked himself/herself
- no duplicate recommendations (distinct pages only).

### Examples  
**Example 1:**  
Input: 
Friendship: `{ (1,2), (1,3), (2,3), (2,4) }`  
Likes: `{ (2,23), (2,33), (3,24), (4,56) }`  
User: `1`
Output: `[23,24,33,56]`
*Explanation: Friends of 1 are 2 and 3. Pages liked by 2 and 3 are 23, 33, 24. Also, friend 2 connects to friend 4 who liked 56, which can count based on how the friendship rows are structured. Exclude duplicates and pages liked by user 1.*

**Example 2:**  
Input: 
Friendship: `{ (1,5), (5,6) }`, Likes: `{ (5,77), (6,88), (1,77) }`, User: `1`
Output: ``
*Explanation: Friend 5 of 1 likes 77 (which 1 already likes, so skip); 5 is also friends with 6, who likes 88 (which 1 does not like), so recommend 88.*

**Example 3:**
Input: 
Friendship: `{ (2,3), (3,1), (1,4) }`, Likes: `{ (3,33), (4,33), (1,33) }`, User: `1` 
Output: `[]`
*Explanation: Friends 3 and 4 of 1 both liked 33, which is already liked by 1, so nothing to recommend.*

### Thought Process (as if you’re the interviewee)  
I first need to find all the friends of the user (remember friendship can be symmetric, so check both columns). For each friend, gather all pages they have liked. The final recommended pages are those friends' likes that the user has **not already liked**. To avoid duplicate recommendations, select only distinct page ids. 

The main challenges are:
- Correctly identifying all the user's friends (user could appear in either user1_id or user2_id columns in Friendship)
- Avoiding recommending pages the user already likes
- Handling cases when there are duplicate recommendations (multiple friends like the same page)

The final SQL generally:
- Joins the Likes and Friendship tables
- Filters to friends of the chosen user
- Excludes pages the user already likes
- Returns DISTINCT page ids

### Corner cases to consider  
- User has no friends (output is empty)
- User’s friends haven’t liked any pages
- User already likes all the pages their friends like
- Friends list contains self (self friendship, should be ignored)
- Duplicated friendship rows

### Solution

```sql
-- Here's a sample SQL solution
WITH Friends AS (
    SELECT user1_id AS friend_id FROM Friendship WHERE user2_id = 1
    UNION
    SELECT user2_id AS friend_id FROM Friendship WHERE user1_id = 1
)
SELECT DISTINCT L.page_id AS recommended_page
FROM Likes L
JOIN Friends F ON L.user_id = F.friend_id
WHERE L.page_id NOT IN (SELECT page_id FROM Likes WHERE user_id = 1)
```

### Time and Space complexity Analysis  
- **Time Complexity:** Depends on table sizes. For each Friendship row you may scan relevant Likes entries. The filtering step against the user's liked pages is typically O(N) if indexed.
- **Space Complexity:** Space is O(D), D = number of distinct recommended pages found for user_id=1, plus space taken by the intermediate lists in the query.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this for any user (not just user_id = 1)?  
  *Hint: Replace literal 1 with a parameter.*

- What if we also want to display how many friends liked each recommended page?  
  *Hint: Add a COUNT and GROUP BY page_id.*

- How to efficiently scale the query for millions of users and pages?  
  *Hint: Proper indexing on user_id in Likes and Friendship, and possible denormalized tables.*

### Summary
This problem is an example of the **Relational Join + Anti-Join** pattern in SQL, very common for recommendation systems. It can be adapted to suggest content entity types (pages, items, videos) based on friends' (or similar users') activities, with additional filters for exclusions. The core join-exclude-distinct approach is broadly useful in social network analysis and collaborative filtering tasks.


### Flashcard
Find all friends of the user, collect pages liked by friends but not by the user, and return distinct recommended page ids.

### Tags
Database(#database)

### Similar Problems
- Page Recommendations II(page-recommendations-ii) (Hard)
- Strong Friendship(strong-friendship) (Medium)