### Leetcode 2092 (Hard): Find All People With Secret [Practice](https://leetcode.com/problems/find-all-people-with-secret)

### Description  
Imagine you have `n` people, labeled `0` to `n-1`. There are several meetings, each described by `[xi, yi, timei]`, meaning person `xi` meets person `yi` at time `timei`. Person `0` knows a secret and shares it with `firstPerson` at time 0.  
At any meeting at time `t`, if either attendee knows the secret *at or before* that time, they'll share it with the other *immediately*. The information can cascade within the same time instant—i.e., after a meeting, someone can instantly pass on the secret to another person in another meeting happening at that time.  
The goal: return all people who will know the secret after all meetings.

### Examples  

**Example 1:**  
Input:  
`n = 6, meetings = [[1,2,5],[2,3,8],[1,5,10]], firstPerson = 1`  
Output:  
`[0,1,2,3,5]`  
Explanation.  
- At time 0: 0 shares the secret with 1.
- At time 5: 1 and 2 meet; both now know the secret.
- At time 8: 2 and 3 meet; 2 already knows, so 3 learns.
- At time 10: 1 and 5 meet; 1 knows the secret, so 5 learns.

**Example 2:**  
Input:  
`n = 4, meetings = [[3,1,3],[1,2,2],[0,3,3]], firstPerson = 3`  
Output:  
`[0,3,1]`  
Explanation.  
- At time 0: 0 shares with 3.
- At time 2: 1 and 2 meet; neither knows the secret.
- At time 3: 3 and 1, and 0 and 3 meet; since 0 and 3 know the secret, 1 learns it too.

**Example 3:**  
Input:  
`n = 5, meetings = [[3,4,2],[1,2,1],[2,3,1]], firstPerson = 1`  
Output:  
`[0,1,2,3,4]`  
Explanation.  
- At time 0: 0 shares with 1.
- At time 1: 1 meets 2, and 2 meets 3. The secret propagates: 1→2→3.
- At time 2: 3 and 4 meet; secret passes to 4.

### Thought Process (as if you’re the interviewee)  
Start by considering a brute-force simulation:  
For every time from 0 up to the latest meeting, for all meetings happening at that time, simulate secret propagation. But checking every time up to the largest time is slow and unnecessary.

Optimize by:
- **Grouping meetings by time**: For every unique time, get all meetings at that instant.
- For each time group, simulate spreading the secret only *within* that group.
    - Since secrets pass instantly, model each group as a graph: connect all meetings that happen at the same time, then run BFS/DFS for secret spread among people at that time.
- After finishing one time group, carry forward updated set of “knowers” to the next time.

This pattern avoids redundant processing and efficiently simulates the simultaneous spread within connected components at each time.

### Corner cases to consider  
- No meetings at all.
- firstPerson = 0 (they already know the secret, so only person 0).
- Multiple meetings at the same time, involving shared participants.
- Disjoint groups of meetings (secret may not reach some people).
- Meetings not sorted by time.
- Single person (n = 1).

### Solution

```python
def findAllPeople(n, meetings, firstPerson):
    from collections import defaultdict, deque

    # 1. Group meetings by time
    time_to_meetings = defaultdict(list)
    for x, y, t in meetings:
        time_to_meetings[t].append((x, y))

    # 2. Knower set: 0 and firstPerson know the secret at time 0
    knowers = set([0, firstPerson])

    # 3. Process meetings in ascending time order
    for time in sorted(time_to_meetings):
        # Graph: nodes = people in current time's meetings
        g = defaultdict(list)
        people_in_meeting = set()
        for x, y in time_to_meetings[time]:
            g[x].append(y)
            g[y].append(x)
            people_in_meeting.add(x)
            people_in_meeting.add(y)

        # Find the people who know the secret at this time
        queue = deque([p for p in people_in_meeting if p in knowers])
        visited = set(queue)
        
        # Spread the secret within the current time group
        while queue:
            u = queue.popleft()
            for v in g[u]:
                if v not in visited:
                    visited.add(v)
                    queue.append(v)
        
        # Everyone reached by BFS now knows the secret
        knowers |= visited

    return list(knowers)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m log m + m + n), where m is the number of meetings.  
    - Grouping meetings: O(m)
    - Sorting by time: O(m log m)
    - For each time group: Each meeting is traversed once; all BFS traversals together across all meetings: O(m).  
- **Space Complexity:**  
  O(n + m):  
    - Knowers: O(n)
    - For each time group temporary structures (graph and visited/bfs), in worst case all n people and m meetings are in one time group.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if there was a delay in secret transmission (i.e., not instant within the same time)?
  *Hint: Meetings can't cascade at the same moment; would have to process one meeting at a time per time.*

- How would you return people in sorted order?
  *Hint: Sort the result list before returning.*

- What if you needed to know at what time each person learned the secret?
  *Hint: Keep a dict of person → first time reached as you propagate.*

### Summary
This problem uses a combination of **graph traversal** (BFS/DFS), **offline event grouping**, and **simulation**. The core pattern is grouping events by time, then spreading state (here, knowledge) through components at each time slice. This approach is common in problems involving infection, rumor spreading, or knowledge propagation over dynamic events.