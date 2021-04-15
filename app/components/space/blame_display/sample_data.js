/*
    [
        { start: 0, end: 14 },
        { start: 16, end: 29 },
        { start: 30, end: 55 },
        { start: 57, end: 95 },
    ],
    
     const exampleData2 = {
            keyUser: "FS",
            tickets: [
                {
                    name: "Backend Query Checklist",
                },
                {
                    name: "Cross-Platform Data Model Spec",
                },
            ],
            pullRequests: [
                {
                    name: "Fixed Modularization of Blame Display",
                },
                {
                    name: "Implemented Github webhooks for getContext",
                },
            ],
            commits: [
                {
                    name: "[QD-278] Validate Trello Lifecycle Tests Progress..",
                },
                {
                    name:
                        "Outdated reference check preventing repository.scanned…",
                },
            ],
            documents: [
                {
                    name: "Async Document Update Flow",
                },
            ],
        };

        const exampleData = {
            keyUser: "KG",
            tickets: [
                {
                    name: "Improve Bulk Scrape Testing",
                },
                {
                    name: "Streamline Trello Scrape",
                },
            ],
            commits: [
                {
                    name:
                        "tryRestoreScrollPosition param added to webviewWorkbenchService",
                },
            ],
            documents: [
                {
                    name: "The Process - Bulk Scraping",
                },
            ],
        };   
        
        chunk = 
                i % 2 == 0
                    ? { ...chunk, ...exampleData }
                    : { ...chunk, ...exampleData2 };
*/
