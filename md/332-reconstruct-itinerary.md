### Leetcode 332 (Hard): Reconstruct Itinerary [Practice](https://leetcode.com/problems/reconstruct-itinerary)

### Description  
Given a list of airline tickets as `[from, to]` pairs, each ticket represents a direct flight from one airport to another. You must reconstruct one valid travel itinerary that uses all the tickets exactly once and **starts at "JFK"**.  
If multiple valid itineraries exist, return the one with the smallest lexicographical order (as if all airport codes were concatenated into a single string).  
You are guaranteed that all tickets form at least one valid itinerary.

### Examples  

**Example 1:**  
Input: `tickets = [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]`  
Output: `["JFK", "MUC", "LHR", "SFO", "SJC"]`  
*Explanation: Travel order is JFK → MUC → LHR → SFO → SJC. All tickets are used. Lexical order is preserved.*

**Example 2:**  
Input: `tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]`  
Output: `["JFK","ATL","JFK","SFO","ATL","SFO"]`  
*Explanation: There are two possible itineraries: JFK → ATL → JFK → SFO → ATL → SFO and JFK → SFO → ATL → JFK → ATL → SFO. The first has a smaller lexical order.*

**Example 3:**  
Input: `tickets = [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]`  
Output: `["JFK","NRT","JFK","KUL"]`  
*Explanation: You must use all tickets. Itinerary: JFK → NRT → JFK → KUL.*

### Thought Process (as if you’re the interviewee)  

First, I recognize that the problem is to find an **Eulerian path** (uses every edge once) in a directed graph, but with an additional requirement: when there’s more than one destination, I must always pick the lexicographically smallest one.

- **Brute-force:** I could try all permutations of tickets and find the one that starts at JFK, uses all tickets once, and is lex smallest. But this would be O(n!), which is infeasible for larger input.

- **DFS Hierholzer's Algorithm:** Since each ticket is used once, I can model airports as graph nodes and tickets as directed edges. For the lexical order, I store each node’s destinations in a **min-heap** (or sort before traversal).

- During DFS, always choose the smallest lexicographical neighbor. When I reach a node with no remaining destination, I add it to the path (backtracking). I finally reverse the path to get the right itinerary order.

- This approach ensures all edges are used once (Eulerian path) and lexical order is maintained due to the use of min-heap or sorting.

**Trade-offs:**  
- Brute-force is simple but impractical for large n due to factorial growth.
- Hierholzer’s/DFS with lexical priority is efficient and leverages both graph and ordering constraints.

### Corner cases to consider  
- Only one ticket, e.g., `[["JFK", "AAA"]]`
- Cycles in the flights, e.g., `[["JFK","A"],["A","JFK"],["JFK","B"]]`
- Multiple tickets between same airports, e.g., `[["JFK","ATL"],["JFK","ATL"],["ATL","JFK"]]`
- Disjoint paths (shouldn’t happen per constraints, but worth coding defensively)
- All destinations from "JFK" require lexical ordering
- Tickets where some airports only have incoming flights
- "JFK" as arrival but not as departure (should not affect start)

### Solution

```python
def findItinerary(tickets):
    from collections import defaultdict

    # Build the graph
    graph = defaultdict(list)
    for src, dest in tickets:
        graph[src].append(dest)

    # Sort the destinations for lexical order
    for src in graph:
        graph[src].sort(reverse=True)  # Pop from end (faster than pop(0))

    result = []

    def visit(airport):
        # While there are unvisited destinations from this airport
        while graph[airport]:
            next_dest = graph[airport].pop()
            visit(next_dest)
        # Append airport to result during backtracking
        result.append(airport)

    # Always start at 'JFK'
    visit("JFK")
    # Reverse to get the correct path order
    return result[::-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E × log D), where E is the number of tickets (edges) and D is the maximum number of destinations from any airport.  
  - Sorting each adjacency list takes O(D log D).
  - The DFS visits each edge once.
- **Space Complexity:** O(E + N), where N is the number of unique airports (vertices) and E is the number of tickets; for storing the graph, recursion stack, and the itinerary result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the itinerary does not necessarily start at "JFK"?  
  *Hint: Think about identifying the correct Eulerian path starting node.*

- What if you’re required to return all possible valid itineraries in lexical order?  
  *Hint: Can you modify your approach to collect all paths and sort them? How does this affect complexity?*

- How much memory can you save if the tickets are guaranteed to never revisit any airport?  
  *Hint: Tree vs. graph traversal; implications on cycles and call stack depth.*

### Summary
This problem is a classic application of **graph traversal with lexical priority**—in particular, a variant of Hierholzer’s algorithm for finding Eulerian paths, combined with lexical ordering using sorted adjacency lists (or min-heaps).  
This pattern (DFS with order constraints) appears in itinerary reconstruction, dependency resolution, and word ladder-type problems. The key takeaway is how to combine traversal algorithms with ordering constraints for unique sequence recovery.


### Flashcard
Build a graph and use DFS with a min-heap for each node to always pick the lexicographically smallest next destination, constructing the Eulerian path.

### Tags
Depth-First Search(#depth-first-search), Graph(#graph), Eulerian Circuit(#eulerian-circuit)

### Similar Problems
- Longest Common Subpath(longest-common-subpath) (Hard)
- Valid Arrangement of Pairs(valid-arrangement-of-pairs) (Hard)