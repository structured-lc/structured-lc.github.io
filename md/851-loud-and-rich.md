### Leetcode 851 (Medium): Loud and Rich [Practice](https://leetcode.com/problems/loud-and-rich)

### Description  
Given **n** people numbered from 0 to n−1, each person has a certain amount of money and a *quietness* value (lower is quieter).  
- You're given a list of pairs `richer` where `richer[i] = [a, b]` means person a is richer than person b.  
- Also given an array `quiet`, where `quiet[i]` is how quiet the iᵗʰ person is.
- For each person x, you have to find the person y who is at least as rich as x (that is, x, or anyone richer in the transitive closure of `richer`) with the *smallest* quietness value.  
Return an array `answer` where `answer[x] = y` as described above.

### Examples  

**Example 1:**  
Input:  
`richer = [[1,0],[2,1],[3,1]]`,  
`quiet = [3,2,5,4]`  
Output:  
`[1,1,2,3]`  
*Explanation:*
- Person 0: richer are [1,2,3]. Quietness levels: [3,2,5,4]. The quietest is 1 (value 2).
- Person 1: richer are [2,3]. Quietest is 1.
- Person 2: no one richer. Quietest is 2.
- Person 3: no one richer. Quietest is 3.

**Example 2:**  
Input:  
`richer = []`,  
`quiet = `  
Output:  
``  
*Explanation:* Only one person, answer is themselves.

**Example 3:**  
Input:  
`richer = [[0,1],[1,2]]`  
`quiet = [1,0,2]`  
Output:  
`[1,1,1]`  
*Explanation:*
- Person 0: No one richer. Answer is 0.
- Person 1: 0 is richer; quiet=1, quiet[1]=0 → answer is 1.
- Person 2: 1 and 0 are richer. quiet levels = [1, 0, 2] → answer is 1.

### Thought Process (as if you’re the interviewee)  
First, clarify:  
- Each pair means a → b (a is richer than b).
- For every x, look for the quietest among everyone richer than (or equal to) x.  
- “As rich or richer” is a transitive relationship.

**Brute-force:**  
For each person, build the set of people richer than or equal (by traversing the richer graph), and then scan for the lowest quiet value.  
- For n people in the worst case, could traverse much of the graph for each x → Inefficient if n is large.

**Optimize (Graph + DFS with Memoization):**  
- Form a graph: b → a edge if a is richer than b.
- For each person, find the quietest in the "richer or equal to x" set.
- Use DFS from each person, memoizing the result:  
    - For each node, the answer is themselves (initially), plus recursively check all people richer than them via the graph.  
    - Take the minimum quiet value among all (including self).
- Each node gets computed once \(O(V+E)\).  
- Or, you could also use topological sorting and DP, but DFS+memo is clean and matches the relationship direction.

### Corner cases to consider  
- No `richer` relationships (everyone's answer is themselves).  
- Multiple people have identical quiet values or wealth.
- Cycles in richer relationships? (Problem description guarantees no cycles.)
- Disconnected people.
- Large n, deep chains.
- Someone is the richest and the quietest for more than one person, check propagation works.

### Solution

```python
def loudAndRich(richer, quiet):
    # Build an adjacency list: b -> list of a, since a is richer than b
    from collections import defaultdict
    n = len(quiet)
    graph = defaultdict(list)
    for a, b in richer:
        graph[b].append(a)  # People richer than b
    
    answer = [-1] * n  # To be filled with quietest person's index for each

    def dfs(x):
        if answer[x] != -1:
            return answer[x]
        
        # Start by assuming themselves is the quietest
        min_person = x
        for y in graph[x]:  # For all people richer than x
            candidate = dfs(y)
            if quiet[candidate] < quiet[min_person]:
                min_person = candidate
        answer[x] = min_person
        return min_person

    for i in range(n):
        dfs(i)
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(V + E), where V = n (number of people), E = number of richer pairs. Each person is visited once, each edge traversed once due to memoization.
- **Space Complexity:** O(V + E) for the adjacency list and O(V) for the answer and recursion stack (in worst case).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of people or relationships is huge?
  *Hint: How can you avoid recursion stack overflow or optimize for memory?*

- Can you solve it using BFS or topological sort instead of DFS?
  *Hint: Consider dependencies and order of updates.*

- What if you wanted to return all equally quiet people and not just one index?
  *Hint: Modify state to collect a list instead of a single minimum.*

### Summary
This problem is a *graph dependency* problem efficiently solved using **DFS with memoization**. The main insight is to reverse the relationship to “who is richer than” and memoize. This pattern of “dependency propagation” appears often in questions about inheritance, scheduling, and reachability, and closely relates to **topological sorting** and **dynamic programming on DAGs**.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Build a Matrix With Conditions(build-a-matrix-with-conditions) (Hard)