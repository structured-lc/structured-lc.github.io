### Leetcode 3433 (Medium): Count Mentions Per User [Practice](https://leetcode.com/problems/count-mentions-per-user)

### Description  
Given a number of users (with IDs from 0 to numberOfUsers - 1), and a list of events, you are to count, for each user, how many times they are mentioned in messages. Each event is either a message event or an offline event:
- A **MESSAGE** event: ["MESSAGE", timestamp, mentions_string]. The mentions_string can refer to users with `id<number>` (possibly duplicates), include the special token "ALL" (mentions all users), or "HERE" (mentions all users who are currently online).
- An **OFFLINE** event: ["OFFLINE", timestamp, id]. This marks a user as offline for 60 time units (they become online again at timestamp + 60).
Count for each user how many times their id appears (even multiple times in the same message) throughout all events. Offline/online status only affects the "HERE" mentions. Status changes happen **before** any message at the same timestamp. All users start online.

### Examples  

**Example 1:**  
Input:  
numberOfUsers = 2,  
events = [  
&nbsp;&nbsp;["MESSAGE", "10", "id0 ALL HERE"],  
&nbsp;&nbsp;["OFFLINE", "10", "1"],  
&nbsp;&nbsp;["MESSAGE", "10", "id1 HERE"]  
]  
Output: `[2, 4]`  
*Explanation:  
- At t=10, user 0 and all users (0,1) and all online users (both at this moment) are mentioned, so mention counts: 1 (id0) + 2 (ALL expands to both) + 2 (HERE expands to both) = user 0: 1+1+1=3, user 1: 1+1+1=3.*
- Status change "OFFLINE" for user 1 processes before "MESSAGE" at t=10. So after, user 1 goes offline, and the second message at t=10: "id1 HERE": id1 (counts for user 1), HERE (only user 0 is still online) → user 0 gets mentioned.
- User 0: total 2 (HERE from two messages) + 1 (id0) + 1 (ALL) = 4; User 1: 1 (id1) + 1 (ALL) + 1 (HERE from first message) = 3.*

**Example 2:**  
Input:  
numberOfUsers = 3,  
events = [  
&nbsp;&nbsp;["MESSAGE", "1", "id1 id2 HERE"],  
&nbsp;&nbsp;["OFFLINE", "2", "1"],  
&nbsp;&nbsp;["MESSAGE", "2", "ALL"],  
&nbsp;&nbsp;["MESSAGE", "65", "HERE"]  
]  
Output: `[2, 3, 3]`  
*Explanation:  
- t=1: id1 and id2 (user 1 and 2) + HERE (all online, so users 0,1,2).  
- t=2: user 1 goes offline.  
- t=2 MESSAGE: ALL => users 0,2 (user 1 is offline).  
- t=65: offline period ends; all online. HERE: users 0,1,2 get a mention.*

**Example 3:**  
Input:  
numberOfUsers = 1,  
events = [  
&nbsp;&nbsp;["MESSAGE", "5", "id0 id0 HERE ALL"],  
&nbsp;&nbsp;["OFFLINE", "6", "0"],  
&nbsp;&nbsp;["MESSAGE", "10", "id0 HERE ALL"]  
]  
Output: ``  
*Explanation:  
- t=5: id0 and id0 (counts as two mentions) + HERE (since only user 0, counts once) + ALL (again, only user 0) = 4 mentions in the first message.  
- t=6: user 0 offline.  
- t=10: id0 + HERE (no users online, so zero) + ALL (user 0 is counted, even if offline) = 2 in second message.  
- Overall: 4 + 2 = 6, but ALL mentions user even if offline, so counts 2 even when offline.*

### Thought Process (as if you’re the interviewee)  
- Parse and process all events, making sure to process status changes at a timestamp before handling any message at that timestamp.
- For each "OFFLINE" event, track when each user goes offline and, after 60 units, comes back online. Simulate their status efficiently, possibly with a min-heap/queue for auto-online recovery or an array with the offline-until timestamp per user.
- For each "MESSAGE", split the mentions_string into tokens:
    - If it's "idX", increment X's count (might occur multiple times in the same message).
    - If it's "ALL", increment all users, regardless of status.
    - If it's "HERE", increment only users currently online.
- Ensure to count duplicated mentions in the same message (if "id1 id1 ALL" appears, user 1 is counted 3 times).
- Carefully merge event order: at each timestamp, process all OFFLINEs first, then all MESSAGEs.

**Trade-offs:**  
- Brute-force: Simulate all status and mention at each event. Efficient handling of online/offline to avoid O(n\*u) at each HERE/ALL by maintaining a set or array for online users.
- Optimize by leveraging event sorting and offline expiry tracking.

### Corner cases to consider  
- Multiple events at same timestamp: status updates precede messages.
- "HERE" mentions when all users are offline give zero mentions.
- User offline but mentioned by id or "ALL": must still count.
- Duplicate id tokens in mentions_string: must be counted multiple times.
- No MESSAGE at all: output zeros.
- All users go offline, then a HERE mention occurs: no one gets counted.
- OFFLINE event after a user is already offline.

### Solution

```python
def countMentionsPerUser(numberOfUsers, events):
    # Sort events by timestamp, preserving order: OFFLINE before MESSAGE at same timestamp
    events_sorted = sorted(events, key=lambda x: (int(x[1]), 0 if x[0]=='OFFLINE' else 1))

    # online status: user i is online if online_status[i] == True
    online_status = [True] * numberOfUsers
    # offline end time for each user (offline until this time)
    offline_until = [0] * numberOfUsers

    # counts for each user
    mentions = [0] * numberOfUsers

    for event in events_sorted:
        event_type, timestamp, arg = event
        timestamp = int(timestamp)

        if event_type == 'OFFLINE':
            user_id = int(arg)
            # set offline, and track until when (timestamp + 60)
            online_status[user_id] = False
            offline_until[user_id] = timestamp + 60
        elif event_type == 'MESSAGE':
            # Before processing this message, update who has come back online
            for i in range(numberOfUsers):
                if not online_status[i] and offline_until[i] <= timestamp:
                    online_status[i] = True

            # Parse the mentions_string into tokens
            tokens = arg.split()
            for token in tokens:
                if token.startswith('id'):
                    user = int(token[2:])
                    mentions[user] += 1
                elif token == 'ALL':
                    for user in range(numberOfUsers):
                        mentions[user] += 1
                elif token == 'HERE':
                    for user in range(numberOfUsers):
                        if online_status[user]:
                            mentions[user] += 1

    return mentions
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E \* n) in the worst case, with E = number of events and n = number of users (for "ALL"/"HERE" tokens, each user checked per event). Mostly O(E + M\*U), with M = total MESSAGE events, U = number of users.
- **Space Complexity:** O(n) for status arrays, O(E) for the events sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of users is extremely large?  
  *Hint: How would you avoid iterating over all users for "ALL" or "HERE" tokens? Maybe represent online users in a smarter way.*

- How would you handle if users can have varying online/offline durations, not fixed 60?  
  *Hint: Use a per-user map for off-until time, or event-driven timeouts.*

- What to do if additional tokens (e.g. group mentions) are introduced in mention_string?  
  *Hint: Design a parser that is extensible and can handle other mention types flexibly.*

### Summary
This problem is a simulation/event-processing problem, requiring careful handling of status changes and token parsing to track mentions accurately. The core pattern involves:
- Maintaining user status efficiently,
- Correctly ordering event processing (status before message),
- Parsing and expanding mention tokens per message.
Similar simulation or event-driven problems can be found in online presence tracking, real-time chat apps, or notification counters.