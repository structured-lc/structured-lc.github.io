### Leetcode 1257 (Medium): Smallest Common Region [Practice](https://leetcode.com/problems/smallest-common-region)

### Description  
You're given a list of lists, each representing a region and its direct subregions (first element is the parent region, rest are children). Two regions region1 and region2 are given. Return their "smallest common region"—the lowest region that contains both given regions (i.e., their lowest common ancestor in the given hierarchy).

### Examples  
**Example 1:**  
Input: `regions = [["Earth","North America","South America"],["North America","United States","Canada"],["United States","New York","Boston"],["Canada","Ontario","Quebec"],["South America","Brazil"]], region1 = "Quebec", region2 = "New York"`  
Output: `"North America"`  
*Explanation: "Quebec" and "New York" are both under "North America".*

**Example 2:**  
Input: `regions = [["World","Earth"],["Earth","North America","South America"],...], region1 = "Brazil", region2 = "Canada"`  
Output: `"Earth"`  
*Explanation: "Brazil" and "Canada" both descend from "Earth".*

**Example 3:**  
Input: `regions = [["World","Continent"],["Continent","Country1","Country2"],["Country1","CityA","CityB"]], region1 = "CityA", region2 = "CityB"`  
Output: `"Country1"`  
*Explanation: "CityA" and "CityB" are siblings, parent is "Country1".*

### Thought Process (as if you’re the interviewee)  
- Think tree/forest representation: build a "child → parent" mapping.
- For each region, follow its parent up to the root, collect all ancestors.
- To find smallest common region: get ancestry chains for both regions, walk up from region2 to the first region in region1's ancestor chain.
- Efficient: O(total region count) to build the map, O(tree height) to trace ancestors.

### Corner cases to consider  
- region1 == region2 (must return one of them)
- Input lists are not a single connected component (forest)
- One region is ancestor of the other
- Duplicates or missing regions

### Solution

```python
def findSmallestRegion(regions, region1, region2):
    parent = dict()
    for group in regions:
        root = group[0]
        for child in group[1:]:
            parent[child] = root
    # Get ancestor set for region1
    ancestors = set()
    cur = region1
    while cur in parent:
        ancestors.add(cur)
        cur = parent[cur]
    ancestors.add(cur)  # root
    # Walk up region2's path to first ancestor
    cur = region2
    while cur not in ancestors:
        cur = parent[cur]
    return cur
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N) — N is number of region names (building parent map, walking up ancestors both proportional to N).
- **Space Complexity:** O(N) — stores parent mapping, ancestry chains.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle multiple queries efficiently?
  *Hint: Precompute depths, use ancestors and binary lifting if large number of queries.*

- What if the regions form a general DAG instead of a tree?
  *Hint: Lowest common ancestor generalizes to DAG LCA (much harder).* 

- Can you output the region chain between region1 and region2?
  *Hint: Record full paths, merge overlaps.*

### Summary
Classic parent-mapping and ancestry lookup, which is the standard Lowest Common Ancestor method for trees represented as parent-children adjacency. This pattern appears in organizational ancestry, category trees and other hierarchical queries.