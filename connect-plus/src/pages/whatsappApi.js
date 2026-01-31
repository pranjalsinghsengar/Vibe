import React from 'react';
import Layout from '../components/layout';
import { Link } from 'react-router-dom';
import { apiurl } from '../config/config.js'
function WhatsappApi() {
    return (
        <Layout>
            <div className="w-full min-h-screen bg-gray-50">

                {/* Main Content */}
                <main className="w-full py-8 sm:py-12">
                    <div className='flex justify-end sm:px-6 lg:px-8 mb-6 mx-4 md:mx-0'>
                        {/* <Link to="https://www.postman.com/infobip/infobip/folder/e6ryxi9/getting-started"> */}
                        <Link to={`${apiurl}/api-docs/`}>
                            <button
                                className="hover:bg-secondary bg-primary border border-secondary text-secondary hover:text-primary px-6 py-3 rounded-sm text-sm md:text-base xl:text-lg font-medium"
                            >
                                API Collection →
                            </button>
                        </Link>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        {/* WhatsApp over API */}
                        <section className="mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-primary pb-2 text-left">
                                WhatsApp over API
                            </h2>
                            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg text-left">
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    Infobip WhatsApp API is a scalable solution that enables businesses to programmatically send and receive messages by integrating WhatsApp as their communication channel. It provides a reliable way to interact with customers over WhatsApp, while maintaining data protection and compliance through end-to-end encryption.
                                </p>
                            </div>
                        </section>

                        {/* Send a Message */}
                        <section className="mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-primary pb-2 text-left">
                                Send a Message
                            </h2>
                            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg text-left">
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    WhatsApp allows businesses to communicate with customers using both predefined message templates and free-form messages within a 24-hour window. The available messaging options depend on the context of the conversation and the customer's last interaction.
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 text-base sm:text-lg space-y-2 mb-4">
                                    <li><strong>Message templates:</strong> Required when initiating a conversation or when more than 24 hours have passed since the last customer message.</li>
                                    <li><strong>Free-form messages:</strong> Can be sent within 24 hours of the last customer message without restrictions.</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    Infobip enables WhatsApp messaging across multiple solutions, including Moments, Answers, Conversations, and Broadcast, allowing businesses to engage customers through automated flows, chatbots, and direct agent interactions.
                                </p>
                                <p className="text-gray-700 mt-4 leading-relaxed text-base sm:text-lg">
                                    Proceed with the sections below to learn how to use WhatsApp messaging effectively in each solution.
                                </p>
                            </div>
                        </section>

                        {/* Message Template */}
                        <section className="mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-primary pb-2 text-left">
                                Message Template
                            </h2>
                            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg text-left">
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Message templates are message formats that are registered and approved by the service provider, and WhatsApp requires businesses to use message templates in business communication to avoid inappropriate usage and ensure the message quality for your customers.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-2">For example:</p>
                                <pre className="bg-gray-100 p-4 rounded-lg my-4 text-xs sm:text-sm text-gray-800 font-mono overflow-x-auto text-left">
                                    Dear {'{{1}}'}, ready to hear more about the future of business communication? Registration starts from {'{{2}}'}. The program starts at {'{{3}}'}.
                                </pre>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    The brackets with numbers are called parameters and they are the only parts of message templates that can be changed. That gives you the possibility to use the same message template several times and adjust it according to your needs.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    For information about managing templates, refer to the <em>Manage templates</em> section.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Once you define the audience in the initial steps, add a new element to the flow called 'Send WhatsApp message'.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    To compose a WhatsApp message that you have already prepared and registered in the form of a message template, select the following from the drop-down menus:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 text-base sm:text-lg space-y-2 mb-4">
                                    <li><strong>From:</strong> Select your registered phone number.</li>
                                    <li><strong>Type:</strong> Select Template.</li>
                                    <li><strong>Template:</strong> Select the name of the template you want to send.</li>
                                    <li><strong>Language code:</strong> Select the language you want to send your message in (only predefined languages apply).</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Only now can you preview the message. In this case, the template has placeholders and the preview section is used for placeholder mapping.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    Placeholders can be mapped to variables defined on the Infobip platform, such as first name, city, etc. or have a fixed value. Variables give you the chance to personalize the message, while fixed value information applies to every message.
                                </p>
                            </div>
                        </section>

                        {/* Media Message Template */}
                        <section className="mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-primary pb-2 text-left">
                                Media Message Template
                            </h2>
                            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg text-left">
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Just like the regular message templates, media message templates also need to be registered and approved by the service provider. The main difference here is that in media templates you can insert one of the supported media types:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 text-base sm:text-lg space-y-2 mb-4">
                                    <li>Image</li>
                                    <li>Document</li>
                                    <li>Video</li>
                                    <li>Location</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-2">Here's a template example:</p>
                                <pre className="bg-gray-100 p-4 rounded-lg my-4 text-xs sm:text-sm text-gray-800 font-mono overflow-x-auto text-left">
                                    Here is your boarding pass for the flight number {'{{1}}'}. Thank you for flying with us ✈️
                                </pre>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    The bracket {'{{1}}'} is a parameter, and it is a part of the message that can be changed. This gives you the possibility to reuse the same template several times and adjust it according to your needs.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    For information about managing templates, refer to the <em>Manage Templates</em> section.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    After your media template has been registered and approved, do the following:
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-2">
                                    Open the web interface, navigate the following path:
                                </p>
                                <p className="bg-gray-100 p-4 rounded-lg my-4 text-xs sm:text-sm text-gray-800 font-mono text-left">
                                        Moments {">"} Communications {">"} Create Flow {">"} Start from Scratch {">"} Predefined audience.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Add the Send WhatsApp message element and define the following:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 text-base sm:text-lg space-y-2 mb-4">
                                    <li><strong>From:</strong> Select your registered phone number.</li>
                                    <li><strong>Type:</strong> Select Media Template.</li>
                                    <li><strong>Media Template:</strong> Select the name of the media template you want to send.</li>
                                    <li><strong>Language code:</strong> Select the language you want to send your message in (only predefined languages apply).</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Now that you’ve defined the basic content, you need to provide more information depending on the type of media that you would like to send:
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-700 font-semibold text-base sm:text-lg">▸ Image message template</p>
                                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg pl-4">
                                            <strong>Image URL:</strong> Type the URL of the image that you want to send
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 font-semibold text-base sm:text-lg">▸ Document message template</p>
                                        <ul className="list-disc pl-10 text-gray-700 text-base sm:text-lg space-y-2">
                                            <li><strong>Document URL:</strong> Type the URL of the document that you want to send</li>
                                            <li><strong>Document Filename:</strong> Type the name of the document that you want to send</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 font-semibold text-base sm:text-lg">▸ Video message templates</p>
                                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg pl-4">
                                            <strong>Video URL:</strong> Type the URL of the video that you wish to send
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 font-semibold text-base sm:text-lg">▸ Location message template</p>
                                        <ul className="list-disc pl-10 text-gray-700 text-base sm:text-lg space-y-2">
                                            <li><strong>Latitude:</strong> Type the location latitude</li>
                                            <li><strong>Longitude:</strong> Type the location longitude</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Get Started with Infobip API */}
                        <section className="mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-primary pb-2 text-left">
                                Get Started with Infobip API
                            </h2>
                            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg text-left">
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    This documentation contains the entire Infobip API offering. One quick glance at the left-side navigation menu reveals the Infobip product stack. Each product contains documentation for every available API endpoint and a webhook.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    <strong>API Key:</strong> You can check your API keys <a href="#" className="text-blue-600 hover:underline">here</a>.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    <strong>Base URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">https://m36r1j.api.infobip.com</code>
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    <a href="#" className="text-blue-600 hover:underline">Learn more</a>
                                </p>

                                {/* Trial Account */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Trial Account</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    While Infobip API is free to explore for everyone, you will need an Infobip account to use it. After the quick sign-up process, you will get your API key and Base URL which is all you need to start using any API. During the trial period you will have some limitations depending on the product you choose. Typically, these are:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 text-base sm:text-lg space-y-2 mb-4">
                                    <li>The number of free messages you can send per channel</li>
                                    <li>The type of recipients - usually, you'll only be able to send messages to your own number or email account registered when signing up</li>
                                    <li>Sender IDs - you will only be able to use a predefined Infobip demo sender</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    The trial is valid for 60 days from the day of account creation. Similarly to a paying account, the performance of your API is influenced by throttling, throughput, and other carrier-related restrictions. <a href="#" className="text-blue-600 hover:underline">Learn more about the trial here</a>.
                                </p>

                                {/* Authentication */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Authentication</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    We support multiple authentication methods. Our recommendation is to use API key header whenever possible.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Once logged in, find your API key at the top of this page, within the web interface homepage, or the API key management page.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-2">API key authentication header example:</p>
                                <pre className="bg-gray-100 p-4 rounded-lg my-4 text-xs sm:text-sm text-gray-800 font-mono overflow-x-auto text-left">
                                    Authorization: App 003026bbc133714df1834b8638bb496e-8f4b3c9a-e931-478d-a994-28a725159ab9
                                </pre>

                                {/* Base URL and Data Centers */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Base URL and Data Centers</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Each Infobip account has its unique Base URL which you should use in every API request you make. If you are logged into Infobip, you will find your Base URL at the top of this page, and it will already be injected in every API endpoint and code example throughout all documentation.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-2">API key authentication header example:</p>
                                <pre className="bg-gray-100 p-4 rounded-lg my-4 text-xs sm:text-sm text-gray-800 font-mono overflow-x-auto text-left">
                                        // Base URL shown below is only a demo, not your base URL. Do not use it in your code.
                                    Base URL: example.infobip.com
                                    Base URL used in the send SMS endpoint: https://example.infobip.com/sms/2/text/advanced
                                </pre>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    We use the base URL to route your request to the correct "regulatory region" and to optimize your traffic between data centers with the region. Base URL is also used by our Support teams for troubleshooting.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4 font-semibold">
                                    NOTE: Base URL is not a secret. Someone else using your base URL won't harm your account in any way. However, if you use a base URL other than your own, you may experience service degradation or even a complete service failure.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    <a href="#" className="text-blue-600 hover:underline">Learn more about Base URLs</a>.
                                </p>

                                {/* OpenAPI Specification */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">OpenAPI Specification</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    To ensure Infobip APIs comply with the industry standards and can be easily integrated, they are all designed according to the OpenAPI Specification framework.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    <a href="#" className="text-blue-600 hover:underline">See the Infobip OpenAPI Specification</a>.
                                </p>

                                {/* SDKs */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">SDKs</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    We, at Infobip provide you with official API client libraries and SDKs in various programming languages. To see all SDKs, refer to our SDKs page in our Developer Hub.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    When it comes to new releases, we follow what is known as Semantic Versioning 2.0.0 standard. In short, that means when we release patches or minor updates, you are safe to update to a new version, because backward compatibility is preserved. All major releases will always contain changes incompatible with previous versions.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    All our API-related SDKs are open sourced and available on GitHub. Our libraries are built on top of the OpenAPI Specification and powered by OpenAPI Generator. This means we do not accept pull requests on those GitHub repositories. However, we strongly encourage you to open new issues in our repositories, as stated in contributing guidelines.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-semibold">Major release upgrading</p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    When upgrading to a major version, carefully review the specific library changelog, read the relevant migration guide where available, and, of course, test the newly upgraded integration.
                                </p>

                                {/* Code Examples */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Code Examples</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    For each API endpoint, we provide one or more use case examples. Each use case has including/excluding parameters on how to complete a task (e.g., Send basic text SMS, send scheduled SMS, send SMS in a specific language, etc.) Each code example is available in multiple programming languages, as well as cURL command, and as a request payload in JSON or XML. Code examples are auto generated from the Open API specification using the Postman code generator. You can copy code examples and use them in your project.
                                </p>

                                {/* Webhooks */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Webhooks</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    If you want to be notified about certain events, such as message delivered status or incoming message status, use webhooks. Webhooks are standard HTTP endpoints implemented in your application that will accept and handle HTTP requests from Infobip. Basically, webhooks save you from having to continuously send requests to the Infobip server asking for message delivery status. Instead, available delivery statuses are forwarded to a provided endpoint. These requests are usually POST requests containing payload in JSON format. Manage and configure your webhooks using the Subscription Management API.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-2">SMS delivery report webhook:</p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    If you want to protect your endpoints from spam, you can use our IP addresses to whitelist the traffic from the Infobip platform. <a href="#" className="text-blue-600 hover:underline">Check out the safe list of IP addresses</a>.
                                </p>

                                {/* Status and Error Codes */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Status and Error Codes</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    When it comes to status codes, we provide the result status codes (which are sent back by the server for any HTTP transaction), as well as API status codes. Find the API Status codes in the response of sent message(s), delivery reports and/or message logs. They are there to help you track the status of sent messages, but can also be very useful when troubleshooting. Error codes, similar to status codes, can also be returned as part of the response for sent message(s) and delivery reports.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-2">Status object example:</p>
                                <pre className="bg-gray-100 p-4 rounded-lg my-4 text-xs sm:text-sm text-gray-800 font-mono overflow-x-auto text-left">
                                    {`{ 
   "groupId": 1,
   "groupName": "PENDING",
   "id": 26,
   "name": "PENDING_ACCEPTED",
   "description": "Message has been accepted and processed."
}`}
                                </pre>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-2">Status object example:</p>
                                <pre className="bg-gray-100 p-4 rounded-lg my-4 text-xs sm:text-sm text-gray-800 font-mono overflow-x-auto text-left">
                                    {`{ 
   "groupId": 0,
   "groupName": "OK",
   "id": 0,
   "name": "NO_ERROR",
   "description": "No Error",
   "permanent": false
}`}
                                </pre>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    For detailed information, refer to <a href="#" className="text-blue-600 hover:underline">Response Statuses and Error Codes</a>.
                                </p>

                                {/* Versioning and API Lifecycle */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Versioning and API Lifecycle</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    The URL of each documented API endpoint contains a current API version number. The endpoint version will change only if a breaking change is introduced. Adding a new field, for example, is not considered a breaking change. However, removing a field or a model structure change is a breaking change. When you introduce a new version, the old one is labeled in documentation as "deprecated".
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    We will never completely retire an API endpoint without notifying you at least 6 months in advance.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    There are exceptions to this rule. For example, for products and endpoints labeled as "early access". In those cases, you need to be prepared to keep up, iterate faster, and experiment with us. Even though the endpoint is flagged as early access, if we detect in our logs that you have been using the API recently, we will notify you about the change.
                                </p>

                                {/* Throughput and Throttling */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Throughput and Throttling</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    The question we often get is how much traffic can our API handle. This depends on which API endpoint is called.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Message sending APIs do not have an upper limit. Many of the largest global enterprises are sending messages over our APIs and we have enough capacity to handle their traffic peaks with resources to spare. However, be aware of bottlenecks that may occur with specific channel providers that sit between Infobip and message recipients. For more details, visit channel documentation for the product you are interested in.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    Every API endpoint that is not sending messages is configured to throttle requests, if the usage goes well over its common use cases. If this happens, you will get an HTTP status code 429 (Too Many Requests).
                                </p>

                                {/* Best Practices */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Best Practices</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    We are working extra hard to make the smoothest experience for developers using our API. One of the ways we try to make that happen is by focusing on consistency in following certain approaches, standards, and practices.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    Refer to <a href="#" className="text-blue-600 hover:underline">Integration Best Practices</a> for more information about how to avoid potential issues, supported date formats, request/response body types, and other coding practices we recommend you follow while using our API.
                                </p>

                                {/* Integrations and Partnership Program */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Integrations and Partnership Program</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                                    Before you start working on your integration solution, you might want to explore existing integrations to check if someone hasn't already created one and made it available for others to use.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    If you believe that your solution could be interesting for a broader audience, we invite you to reach out to the Partnerships team. We love seeing how other platforms benefit from our connectivity offering.
                                </p>

                                {/* Help and Support */}
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4 text-left">Help and Support</h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">If you got stuck, here's what you can do:</p>
                                <ul className="list-disc pl-6 text-gray-700 text-base sm:text-lg space-y-2">
                                    <li>Check the uptime status of the product in use.</li>
                                    <li>Use our Documentation Hub. There's a good chance you'll find your answers there.</li>
                                    <li>If you have a more general question or you're struggling to get something to work, consider Stack Overflow or Twitter.</li>
                                    <li>If you've found a bug or have an account-specific question, create a ticket for our Support team.</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </Layout>
    );
}

export default WhatsappApi;