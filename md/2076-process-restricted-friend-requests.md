### Leetcode 2076 (Hard): Process Restricted Friend Requests [Practice](https://leetcode.com/problems/process-restricted-friend-requests)

### Description  
Given `n` people labeled from 0 to n-1, friendship requests are made among them. Some pairs are restricted: if you accept both (u, v) and any restricted pair (a, b), it must not be possible for both a and b to be friends (directly or indirectly through other friends). For each request, accept it if no restrictions are violated (including forming indirect connections), otherwise deny it. Return a list of booleans representing acceptance of each request, in order.

### Examples  

**Example 1:**  
Input: `n = 5`, `restrictions = [[0,1],[3,4]]`, `requests = [[0,2],[2,3],[3,4],[2,4],[1,2]]`  
Output: `[true, true, false, false, true]`  
*Explanation:*
- (0,2): No restriction, can accept.  
- (2,3): No restriction, can accept.  
- (3,4): Can't accept; 3 and 4 are restricted, and this would link them.  
- (2,4): Can't accept; 0 and 1 would connect, violating the [0,1] restriction.  
- (1,2): Can accept; doesn't violate restrictions in current state.

**Example 2:**  
Input: `n = 3`, `restrictions = [[0,1]]`, `requests = [[0,2],[2,1],[0,1]]`  
Output: `[true, true, false]`  
*Explanation:*
- (0,2): No restriction, can accept.
- (2,1): No restriction, can accept.
- (0,1): Can't accept; all three are now friends, would give 0/1 common set.

**Example 3:**  
Input: `n = 2`, `restrictions = []`, `requests = [[0,1]]`  
Output: `[true]`  
*Explanation:*  
- (0,1): No restriction at all.

### Thought Process (as if you’re the interviewee)  
The brute-force solution would be to rebuild the friend graph after each request and check if any restricted pair has become connected, but this is extremely inefficient (potentially O(n²) per request).

To optimize, use **Union-Find (Disjoint Set Union, DSU)** to dynamically track which people are friends.  
- For each request (u, v), tentatively connect their friend groups.
- Before making the union permanent, check all restrictions [(a, b)]: If a and b would become friends due to this union, reject the request.
- If no restriction violated, union their groups and accept the request.

Union-Find efficiently supports union and find operations, and with path compression, operations are nearly constant time.

We need to be careful to check restrictions *after* the union would be done, but before making it permanent. One way is to "simulate" the union by checking parent sets first, and then merge only if safe.

### Corner cases to consider  
- n = 1 (single person, can't have any friends)
- restrictions = [] (no restrictions)
- requests with duplicate pairs or self-pairs
- requests that would connect restricted pairs *indirectly* via other people
- requests where u and v are already friends

### Solution

```python
class Solution:
    def friendRequests(self, n, restrictions, requests):
        # DSU boilerplate
        parent = list(range(n))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]  # Path compression
                x = parent[x]
            return x

        def union(x, y):
            px, py = find(x), find(y)
            if px != py:
                parent[py] = px

        ans = []
        for u, v in requests:
            pu, pv = find(u), find(v)
            if pu == pv:
                ans.append(True)  # already friends
                continue

            # Check all restrictions: Will any restricted pair be in the same component?
            can_union = True
            for a, b in restrictions:
                pa, pb = find(a), find(b)
                # If this union merges pu & pv, will either restriction be violated?
                # That is, (a in u's group and b in v's group) or vice versa,
                # after union they would be together.
                if ( (pa == pu and pb == pv) or (pa == pv and pb == pu) ):
                    can_union = False
                    break
            if can_union:
                union(u, v)
                ans.append(True)
            else:
                ans.append(False)
        return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(|restrictions| × |requests| × α(n)), where α(n) is the inverse Ackermann function (almost constant). For each request, check all restrictions.
- **Space Complexity:** O(n), for union-find parent array and call stack in path compression.

### Potential follow-up questions (as if you’re the interviewer)  

- If restrictions are very large, can you do better than O(|restrictions| × |requests|)?
  *Hint: Can you preprocess restrictions by grouping or indexing for faster lookup?*

- How would you modify the solution if friend requests can be deleted (un-unioned)?
  *Hint: Classic DSU can't un-union, but can you use rollback/undo DSU or persistent DSU?*

- Instead of single restrictions, what if restrictions are on triplets (a, b, c: no three-way connections)?
  *Hint: Do you need a new way to model the restriction graph or set?*

### Summary
This problem is a classic application of the **Union-Find (Disjoint Set Union, DSU)** structure for dynamic connectivity checking, with the twist of rejection based on additional constraints. It's important to simulate the union and only commit if all constraints are satisfied.  
This union-find-with-constraints approach is common in social network, grouping, and clustering problems, and appears in problems like Kruskal's algorithm with forbidden edges, or network security segmentation tasks.

### Tags
Union Find(#union-find), Graph(#graph)

### Similar Problems
- Number of Islands II(number-of-islands-ii) (Hard)
- Smallest String With Swaps(smallest-string-with-swaps) (Medium)
- Maximum Employees to Be Invited to a Meeting(maximum-employees-to-be-invited-to-a-meeting) (Hard)