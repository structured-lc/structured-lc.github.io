### Leetcode 1203 (Hard): Sort Items by Groups Respecting Dependencies [Practice](https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies)

### Description  
You are given **n** items, each either belonging to a group (numbered 0 to m-1) or no group (group `-1`). Some items have dependencies: for some pairs, one item must appear before another. Your goal is to return a sorted list of items such that:
- Items from the same group appear consecutively,
- All dependency (beforeItems) relationships are respected,
- If impossible, return an empty list.

Groups and their inner items can have dependencies with each other. Items without a group should be treated as single-item groups to fit the consecutive-group requirement.

### Examples  

**Example 1:**  
Input:  
`n=8, m=2, group=[-1,0,0,1,0,1,-1,-1], 
beforeItems=[[],,[5],,[3,6],[],[],[]]`  
Output:  
`[6,3,4,1,5,2,0,7]`  
*Explanation: Items 6,3,4,1,5,2,0,7 work because:*
- Items from the same group are consecutive (e.g., [1,4,2,5] for group 0 and 1),
- Dependencies respected (e.g., 3 before 4, 6 before 3/4/1/5...).

**Example 2:**  
Input:  
`n=4, m=1, group=[-1,0,0,-1], 
beforeItems=[[],,[],[1,2]]`  
Output:  
`[0,1,2,3]`  
*Explanation:*
- Items in group 0 (1,2) are together;
- Items 0 before 1 (from dependencies), items 1,2 before 3.

**Example 3:**  
Input:  
`n=3, m=1, group=[-1,0,0],
beforeItems=[[1],[2],[1]]`  
Output:  
`[]`  
*Explanation:*
- Cycle: 1 before 2, 2 before 1.

### Thought Process (as if you’re the interviewee)  

- First, realize this is a **topological sorting** problem at two levels: groups and items.
- *Brute-force idea:* Try to topologically sort all items and then check if group contiguous-ness is satisfied.  
  - Flaw: It’s impossible for random outputs; too slow and doesn't guarantee group adjacency.
- *Optimized approach:*
  - Assign unique group numbers to all ungrouped items (so that each can be handled in group-level sort).
  - For each group, maintain:
    - Internal item-to-item (intra-group) dependencies,
    - Group-to-group (inter-group) dependencies,
  - Run topological sort:
    1. First, on groups (build group dependency graph, sort groups).
    2. For each group, perform topological sort of its items.
    3. Concatenate the inner item ordering in the group-order found above.
- *Why choose this approach*:  
  - Ensures both group adjacency and dependency satisfaction.
  - Handles all edge cases and cycles via standard topological sorting.

### Corner cases to consider  
- Items with no group (`-1`)—should be treated as individual groups.
- Some group(s) not present in any dependency.
- Cycles in item dependencies (no valid ordering).
- Cycles in group dependencies.
- Empty input: n = 0.
- Groups with only one item, or items with no dependencies.
- Multiple items with the same group but no dependencies between them.

### Solution

```python
def sortItems(n, m, group, beforeItems):
    # Assign unique group to each ungrouped item
    for i in range(n):
        if group[i] == -1:
            group[i] = m
            m += 1
    
    # Build item and group dependency graphs
    from collections import defaultdict, deque
    
    item_graph = defaultdict(list)
    item_indegree = [0] * n
    group_graph = defaultdict(list)
    group_indegree = [0] * m
    
    # Map group to its items
    group_items = defaultdict(list)
    for i in range(n):
        group_items[group[i]].append(i)
    
    # Build item graph & group graph
    for curr in range(n):
        for prev in beforeItems[curr]:
            item_graph[prev].append(curr)
            item_indegree[curr] += 1
            # If cross-group dependency, link groups too
            if group[prev] != group[curr]:
                group_graph[group[prev]].append(group[curr])
                group_indegree[group[curr]] += 1
    
    # Standard topological sort
    def topo_sort(nodes, graph, indegree):
        res = []
        dq = deque([x for x in nodes if indegree[x] == 0])
        while dq:
            node = dq.popleft()
            res.append(node)
            for nei in graph[node]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    dq.append(nei)
        return res if len(res) == len(nodes) else []
    
    group_order = topo_sort(list(range(m)), group_graph, group_indegree[:])
    if not group_order:
        return []
    
    result = []
    for grp in group_order:
        items = group_items[grp]
        if not items:
            continue
        item_order = topo_sort(items, item_graph, item_indegree[:])
        if not item_order:
            return []
        result.extend(item_order)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m + dependencies).  
  - Building graphs: O(n + dependencies)
  - Two topological sorts: one at group level (O(m + group dependencies)), one at item level (O(n + per group dependencies))
- **Space Complexity:** O(n + m + dependencies).  
  - Graph storage and orderings.

### Potential follow-up questions (as if you’re the interviewer)  

- If there are a million items but only a few distinct groups, how does your solution scale?
  *Hint: What is the most expensive step in terms of n vs m?*

- How would you detect and return which specific dependency is causing a cycle?
  *Hint: Can you modify your topo-sort to track node path?*

- Could you optimize for the case when there are concurrent (parallel) dependencies?
  *Hint: How would you schedule multiple groups/items in parallel given their dependencies?*

### Summary
This problem leverages the classic **topological sort** at two levels: group and item. By handling ungrouped items as "single-item groups", and modeling dependencies as directed graphs, we ensure both group-adjacency and dependency satisfaction. This is a common graph + sorting pattern, applicable in build systems, task execution scheduling, and dependency resolution in package managers.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
